using nego.communs.Global;
using nego.communs.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.business
{
    public interface IActionService<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<bool> DeleteById(int id);
        Task<T> Add(EntityRessource data);
        Task<T> Update(EntityRessource data);
    }
}
