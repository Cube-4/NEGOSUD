using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
using nego.communs.Resource.Other;

namespace nego.business
{
    public interface IArticleService : IActionService<ArticleRessource>
    {
        Task<bool> ChangeQuantity(ChangeQuantityRequest data);
    }
}