using Microsoft.EntityFrameworkCore;
using PXBank.Business.Context.Interface;
using PXBank.Business.Entity;
using PXBank.Business.Repository.Generic;
using PXBank.Business.Repository.Interface;
using PXBank.Business.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Repository
{
    public class PessoaRepository : GenericRepository<Pessoa>, IPessoaRepository
    {
        public PessoaRepository(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public IEnumerable<Pessoa> GetAllPessoa(Expression<Func<Pessoa, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount)
        {
            var pos = pageSize * (pageNumber);
            var q = _context.Pessoa.AsNoTracking().Include(p => p.Departamento).Include(p => p.Dependente)
        .Select(p => new Pessoa
        {
            PessoaID = p.PessoaID,
            Nome = p.Nome,
            Cpf = p.Cpf,
            DepartamentoID = p.DepartamentoID,
            Departamento = p.Departamento,
            Salario = p.Salario,
            DataNascimento = p.DataNascimento,
            NumFilhos = p.Dependente.Count(), // Contagem de dependentes
            IsAtivo = p.IsAtivo
        });


            totalCount = q.Where(predicate).Count();

            if (sortOrder == "desc" && !string.IsNullOrEmpty(sortField))
                return q.Where(predicate).OrderByDescending(sortField).Skip(pos).Take(pageSize);
            else if (!string.IsNullOrEmpty(sortField))
                return q.Where(predicate).OrderBy(sortField).Skip(pos).Take(pageSize);
            else
                return q.Where(predicate).Skip(pos).Take(pageSize);
        }
    }
}
