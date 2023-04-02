using nego.communs.Model;
using nego.communs.Resource.Other;

namespace nego.business
{
    public interface ICartService
    {
        Cart GetCart();
        Task<bool> AddToCart(CartRequest data);
        Task<bool> RemoveFromCart(CartRequest data);
        Task<bool> ClearCart();
    }
}
