using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PXBank.Business.CustomException;
using PXBank.Business.Entity;
using PXBank.Service.Service.Interface;
using PXBank.WebAPI._Core.Models;
using PXBank.WebAPI._Core;

namespace PXBank.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DependenteController : ControllerBase
    {
        private IDependenteService _serviceDependente;

        public DependenteController(
            IDependenteService serviceBase)
        {
            _serviceDependente = serviceBase; // new BaseService(dataContext);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Dependente>> Get(int id)
        {
            try
            {
                if (id == 0)
                {
                    return NotFound();
                }

                return await _serviceDependente.Find(id);
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

        [HttpPost]
        public async Task<ActionResult> Insert(Dependente dados)
        {
            try
            {
                await _serviceDependente.Add(dados);
                return Ok();
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

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _serviceDependente.Remove(id);
                return Ok();
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

        [HttpPut]
        public async Task<ActionResult> Update(Dependente dados)
        {
            try
            {

                if (dados.DependenteID == 0)
                {
                    return NotFound();
                }

                var dependente = await _serviceDependente.Find(dados.DependenteID);

                dependente.CPF = dados.CPF;
                dependente.DataNascimento = dados.DataNascimento.ToUniversalTime();
                dependente.Nome = dados.Nome;

                await _serviceDependente.Edit(dependente);
                return Ok();
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

        [HttpGet]
        [Route("GetByPage/{pessoaID}")]
        public async Task<ActionResult<QueryResultsModel>> find(int pessoaID, string search = "", string sortOrder = "", string sortField = "", int pageNumber = 1, int pageSize = 0,
            int status = -1)
        {
            try
            {
                sortField = Utils.UpperCaseFirst(sortField);

                int totalCount = 0;

                //nao vai utilizar
                bool inativo = status == 0 ? false : true;

                var emps = _serviceDependente.GetAllDependente(x => (string.IsNullOrEmpty(search) || x.Nome.Contains(search))
                                        && (pessoaID == 0 || x.PessoaID == pessoaID)
                                        , sortOrder, sortField, pageNumber, pageSize, ref totalCount).ToList();

                QueryResultsModel result = new QueryResultsModel();
                result.items = emps;
                result.totalCount = totalCount;
                result.errorMessage = "";

                return Ok(result);
            }
            catch (Exception ex)
            {
                QueryResultsModel result = new QueryResultsModel();
                result.items = null;
                result.totalCount = 0;
                result.errorMessage = ex.ToString();

                return StatusCode(700, ex.ToString());
            }
        }
    }
}