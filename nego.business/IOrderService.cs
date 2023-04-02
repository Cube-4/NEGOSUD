using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
using nego.communs.Resource.Other;

namespace nego.business
{
    public interface IOrderService : IActionService<OrderRessource>
    {
        Task<bool> ConfirmOrder(int id);
    }
}