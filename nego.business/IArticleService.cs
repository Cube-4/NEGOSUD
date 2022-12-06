using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;

namespace nego.business
{
    public interface IArticleService : IActionService<ArticleRessource>
    {
        Task<bool> ChangeQuantity(int id, int quantity, string type);
    }
}