// The interface need UserRessource from nego.communs
using nego.communs.Resource;

namespace nego.business
{
    public interface IUserService : IActionService<UserRessource>
    {
        Task<UserRessource> Authenticate(AuthenticateRequest model);
    }
}
