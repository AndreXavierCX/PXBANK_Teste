using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Context.Interface
{
    public interface IUnitOfWork
    {
        void Save();
    }
}