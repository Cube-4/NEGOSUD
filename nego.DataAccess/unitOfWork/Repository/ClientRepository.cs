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
    public class ClientRepository : IClientRepository

    {
        private readonly NegoSudDbContext _negoSudDbContext;
        
        public ClientRepository(NegoSudDbContext negoSudDbContext)
        {
            _negoSudDbContext = negoSudDbContext;
        }
        public void Add(Client user)
        {
            _negoSudDbContext.Clients.Add(user);
        }

        public void Delete(Client user)
        {
            //_negoSudDbContext.Clients.ExecuteDelete(user);
        }

        public List<Client> GetAll()
        {
            return _negoSudDbContext.Clients.ToList();
        }

        public Client GetOne(int id)
        {
            return _negoSudDbContext.Clients.FirstOrDefault(Client => Client.Id == id);
        }

        public void Update(Client user)
        {
            throw new NotImplementedException();
        }
    }
}
