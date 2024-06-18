using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using System.Text;
using NLog;
using PXBank.Business.Context;
using Microsoft.EntityFrameworkCore;
using PXBank.WebAPI.Log;
using PXBank.WebAPI.Extensions;
using PXBank.Service.Service;
using PXBank.Service.Service.Interface;

namespace PXBank.WebAPI
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));


            //services.AddCors();
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.IgnoreNullValues = true;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                //options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
            });

            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "V1.0.0",
                    Title = "PXBank Teste",
                    Description = "API BackEnd para PXBank Teste",
                });
            });



            //Configura o serviço CORS para segurança
            services.AddCors(options =>
                options.AddPolicy("ApiCorsPolicy", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .Build();
                }));

            //Adiciona o context para IHostingEnvironment
            services.AddHttpContextAccessor();

            //Adiciona a camada de LOG
            services.AddSingleton<ILoggerManager, LoggerManager>();

            // configure DI for application services
            ConfigurePXBankServices(services);
        }

        private void ConfigurePXBankServices(IServiceCollection services)
        {
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<IDepartamentoService, DepartamentoService>();
            services.AddScoped<IDependenteService, DependenteService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerManager logger)
        {

            //Configure Logging
            app.ConfigureExceptionHandler(logger);
            app.ConfigureCustomExceptionMiddleware();

            app.UseRouting();

            app.UseCors("ApiCorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }
}
