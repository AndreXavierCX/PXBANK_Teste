using PXBank.Business.Context.Interface;
using PXBank.Business.Entity;
using PXBank.Business.Repository.Generic;
using PXBank.Business.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Repository
{
    public class DepartamentoRepository :  GenericRepository<Departamento>, IDepartamentoRepository
    {
        public DepartamentoRepository(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }


    }
}
