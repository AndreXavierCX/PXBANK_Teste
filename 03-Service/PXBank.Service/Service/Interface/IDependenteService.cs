﻿using PXBank.Business.Entity;
using PXBank.Service.Service.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Service.Service.Interface
{
    public interface IDependenteService : IGenericService<Dependente>, IDisposable
    {
        IEnumerable<Dependente> GetAllDependente(Expression<Func<Dependente, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount);
    }
}
