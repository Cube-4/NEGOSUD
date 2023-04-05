using nego.communs.Global;
using nego.communs.Model;

namespace nego.communs.Model
{
    public class Cart : Entity
    {
        public virtual List<CartArticle> Articles { get; set; }
        public float TotalPrice { get; set; }

        public Cart()
        {
            Articles = new List<CartArticle>();
        }
    }
}
