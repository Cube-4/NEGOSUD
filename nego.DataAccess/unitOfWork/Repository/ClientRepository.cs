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
        public void Add(Client client)
        {
            _negoSudDbContext.Clients.Add(client);
        }

        public void Delete(Client client)
        {
            _negoSudDbContext.Clients.Remove(client);
        }

        public List<Client> GetAll()
        {
            return _negoSudDbContext.Clients.ToList();
        }

        public Client GetOne(int id)
        {
            return _negoSudDbContext.Clients.FirstOrDefault(Client => Client.Id == id);
        }

        public void Update(Client client)
        {
            _negoSudDbContext.Clients.Update(client);
        }
    }
}
