using PXBank.WebAPI.Error;
using PXBank.WebAPI.Log;
using System.Net;

namespace PXBank.WebAPI.CustomExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerManager _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILoggerManager logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (AccessViolationException avEx)
            {
                _logger.LogError($"A new violation exception has been thrown: {avEx}");
                await HandleExceptionAsync(httpContext, avEx);
            }
            catch (Exception ex)
            {
                //_logger.LogError($"Something went wrong: {ex}");
                _logger.LogError(ex.ToString());
                if (ex.InnerException != null)
                {
                    _logger.LogError($"InnerException: {ex.InnerException}");
                }
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            string mensagemEx = "";
            if (_env.IsDevelopment())
            {
                mensagemEx = exception.ToString();
            }
            var message = exception switch
            {
                AccessViolationException => "Access violation error from the custom middleware",
                _ => $"Ocorreu um erro interno do servidor. {mensagemEx}"
            };

            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            }.ToString());
        }
    }
}
