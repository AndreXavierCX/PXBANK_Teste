using PXBank.Business.Entity;
using PXBank.Business.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Repository.Interface
{
    public interface IDependenteRepository : IGenericRepository<Dependente>, IDisposable
    {
    }
}
