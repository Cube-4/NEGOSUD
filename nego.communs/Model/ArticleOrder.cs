using nego.communs.Global;

namespace nego.communs.Model
{
    public class ArticleOrder : Entity
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        
        public int ArticleId { get; set; }
        public Article Article { get; set; }
        
        public int Quantity { get; set; }
        public float TotalPrice { get; set; }
    }
}
