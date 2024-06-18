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
    public class DependenteRepository : GenericRepository<Dependente>, IDependenteRepository
    {
        public DependenteRepository(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public IEnumerable<Dependente> GetAllDependente(Expression<Func<Dependente, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize,ref int totalCount)
        {
            var pos = pageSize * (pageNumber);
            var q = _context.Dependente.AsNoTracking()
                    .Select(p => new Dependente
                    {
                        PessoaID = p.PessoaID,
                        Nome = p.Nome,
                        CPF = p.CPF,
                        DataNascimento = p.DataNascimento,
                        DependenteID = p.DependenteID,
                        Idade  = (DateTime.Today.Year - p.DataNascimento.Year - 1) + ((DateTime.Today.Month > p.DataNascimento.Month || (DateTime.Today.Month == p.DataNascimento.Month && DateTime.Today.Day >= p.DataNascimento.Day)) ? 1 : 0)
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
