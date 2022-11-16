using nego.communs.Resource;

namespace nego.business
{
    public interface IClientService
    {
        Task<List<ClientRessource>> GetAll();
        Task<ClientRessource> GetById(int id);
        Task<bool> DeleteById(int id);
        Task<bool> Create(ClientRessource data);
        Task<bool> Update(ClientRessource data);
    }
}
