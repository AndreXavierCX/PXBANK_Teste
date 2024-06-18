using PXBank.Business.Context;
using PXBank.Business.Entity;
using PXBank.Business.Repository;
using PXBank.Service.Service.Generic;
using PXBank.Service.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Service.Service
{
    public class PessoaService : GenericService<Pessoa>, IPessoaService
    {
        public PessoaRepository db;

        public PessoaService(DataContext _context) : base(_context)
        {
            db = new PessoaRepository(_context);
        }

        public IEnumerable<Pessoa> GetAllPessoa(Expression<Func<Pessoa, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount)
        {
            return db.GetAllPessoa(predicate, sortOrder, sortField, pageNumber, pageSize, totalCount);
        }
    }
}