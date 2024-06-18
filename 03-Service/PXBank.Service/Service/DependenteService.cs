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
    public class DependenteService : GenericService<Dependente>, IDependenteService
    {
        public DependenteRepository db;

        public DependenteService(DataContext _context) : base(_context)
        {
            db = new DependenteRepository(_context);
        }

        public IEnumerable<Dependente> GetAllDependente(Expression<Func<Dependente, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount)
        {
            return db.GetAllDependente(predicate, sortOrder, sortField, pageNumber, pageSize, totalCount);
        }
    }
}