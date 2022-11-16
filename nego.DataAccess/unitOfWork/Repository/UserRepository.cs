using Microsoft.EntityFrameworkCore;
using nego.communs.Model;
using nego.DataAccess.dbContexte;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.unitOfWork.Repository
{
    public class UserRepository : IUserRepository

    {
        private readonly NegoSudDbContext _negoSudDbContext;
        
        public UserRepository(NegoSudDbContext negoSudDbContext)
        {
            _negoSudDbContext = negoSudDbContext;
        }
        public void Add(User user)
        {
            _negoSudDbContext.Clients.Add(user);
        }

        public void Delete(User user)
        {
            _negoSudDbContext.Clients.Remove(user);
        }

        public List<User> GetAll()
        {
            return _negoSudDbContext.Clients.ToList();
        }

        public User GetOne(int id)
        {
            return _negoSudDbContext.Clients.FirstOrDefault(User => User.Id == id);
        }

        public void Update(User user)
        {
            _negoSudDbContext.Clients.Update(user);
        }
    }
}
