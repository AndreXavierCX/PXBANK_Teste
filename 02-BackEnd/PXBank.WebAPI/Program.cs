using PXBank.WebAPI;

namespace PXBank.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseIIS();
                    /*webBuilder.ConfigureLogging((hostingContext, logging) =>
                      {
                          logging.AddNLog(hostingContext.Configuration.GetSection("Logging"));
                      });*/
                });
    }
}