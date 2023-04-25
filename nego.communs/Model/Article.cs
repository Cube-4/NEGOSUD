using nego.communs.Global;

namespace nego.communs.Model
{
    public class Article : Entity
    {
        public string Name { get; set; }
        public string Reference { get; set; }
        public DateTime Date { get; set; }
        public string Origin { get; set; }
        public int Stock { get; set; }
        public float Price { get; set; }

        public string StripePriceId { get; set; }

        public string StripeProductId { get; set; }

        public virtual List<ArticleOrder> Orders { get; set; }
        public virtual List<CartArticle> Carts { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public Article()
        {
            Orders = new List<ArticleOrder>();
        }
    }
}