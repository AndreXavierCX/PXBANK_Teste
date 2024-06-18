using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PXBank.Business.CustomException;
using PXBank.Business.Entity;
using PXBank.Service.Service.Interface;

namespace PXBank.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {
        private IDepartamentoService _serviceDepartamento;

        public DepartamentoController(
            IDepartamentoService serviceBase)
        {
            _serviceDepartamento = serviceBase; // new BaseService(dataContext);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departamento>>> Get()
        {
            try
            {
                return await _serviceDepartamento.List();
            }
            catch (CustomException ex)
            {
                return BadRequest(ex.ToBadRequest());
            }
            catch
            {
                throw;
            }
        }

    }
}
