using nego.communs.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.unitOfWork.Repository
{
    public interface IUserRepository
    {
        User GetOne(int id);
        List<User> GetAll();
        void Add(User user);
        void Update(User user);
        void Delete(User user);
    }
}
