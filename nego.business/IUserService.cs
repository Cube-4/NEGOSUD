// The interface need UserRessource from nego.communs
using nego.communs.Resource;

namespace nego.business
{
    public interface IUserService
    {
        Task<List<UserRessource>> GetAll();
        Task<UserRessource> GetById(int id);
        Task<bool> DeleteById(int id);
        Task<bool> Create(UserRessource data);
        Task<bool> Update(UserRessource data);
    }
}
