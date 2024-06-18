using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PXBank.Business.CustomException;
using PXBank.Business.Entity;
using PXBank.Service.Service.Interface;
using PXBank.WebAPI._Core;
using PXBank.WebAPI._Core.Models;

namespace PXBank.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : Controller
    {
        private IPessoaService _servicePessoa;

        public PessoaController(
            IPessoaService serviceBase)
        {
            _servicePessoa = serviceBase; // new BaseService(dataContext);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Pessoa>> Get(int id)
        {
            try
            {
                if (id == 0)
                {
                    return NotFound();
                }

                return await _servicePessoa.Find(id);
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
        public async Task<ActionResult> Insert(Pessoa dados)
        {
            try
            {
                var inserir = new Pessoa()
                {
                    Cpf = dados.Cpf,
                    DataNascimento = dados.DataNascimento.ToUniversalTime(),
                    DepartamentoID = dados.DepartamentoID,
                    IsAtivo = true,
                    Nome = dados.Nome,
                    NumFilhos = dados.NumFilhos,
                    Salario = dados.Salario
                };
                

                await _servicePessoa.Add(inserir);
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
                var pessoa = await _servicePessoa.Find(id);
                pessoa.IsAtivo = false;
                pessoa.DataNascimento = pessoa.DataNascimento.ToUniversalTime();
                await _servicePessoa.Edit(pessoa);

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
        public async Task<ActionResult> Update(Pessoa dados)
        {
            try
            {

                if (dados.PessoaID == 0)
                {
                    return NotFound();
                }
                var pessoa = await _servicePessoa.Find(dados.PessoaID);

                pessoa.Cpf = dados.Cpf;
                pessoa.DataNascimento = dados.DataNascimento.ToUniversalTime();
                pessoa.DepartamentoID = dados.DepartamentoID;
                pessoa.Nome = dados.Nome;
                pessoa.NumFilhos = dados.NumFilhos;
                pessoa.Salario = dados.Salario;

                await _servicePessoa.Edit(pessoa);
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
        [Route("GetByPage/{departamentoID}")]
        public async Task<ActionResult<QueryResultsModel>> find(int departamentoID, string search = "", string sortOrder = "", string sortField = "", int pageNumber = 1, int pageSize = 0,
            int status = -1)
        {
            try
           {
                sortField = Utils.UpperCaseFirst(sortField);

                int totalCount = 0;

                //nao vai utilizar
                bool inativo = status == 0 ? false : true;

                var emps = _servicePessoa.GetAllPessoa(x => x.IsAtivo == true
                                        && (string.IsNullOrEmpty(search) || x.Nome.Contains(search) || x.Cpf.Contains(search))
                                        &&(departamentoID == 0 || x.DepartamentoID == departamentoID)
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
