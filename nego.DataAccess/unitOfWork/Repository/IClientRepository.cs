using nego.communs.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.unitOfWork.Repository
{
    public interface IClientRepository
    {
        Client GetOne(int id);
        List<Client> GetAll();
        void Add(Client user);
        void Update(Client user);
        void Delete(Client user);
    }
}
