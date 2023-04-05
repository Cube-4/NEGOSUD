using nego.communs.Global;

namespace nego.communs.Model
{
    public class CartArticle : Entity
    {
        public int ArticleId { get; set; }
        public Article Article { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int Quantity { get; set; }
        public float TotalPrice { get; set; }
    }
}
