using nego.business;
using nego.communs.Model;

namespace nego.services
{
    public class ClientService : IClientService
    {
        public List<Client> Clients { get; set; }

        public ClientService()
        {
            Clients = new List<Client>
            {
                new Client(1, "OK", "ko", DateTime.Now, "ok@ko.OKko")
            };
        }

        public List<Client> GetAll()
        {
            return Clients;
        }

        public Client GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public bool Create(Client data)
        {
            throw new NotImplementedException();
        }

        public Client Update(Client data)
        {
            throw new NotImplementedException();
        }
    }
}