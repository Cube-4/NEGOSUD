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
        
        public List<OrderArticle> Orders { get; set; }        
        public virtual User User { get; set; }

        public Article()
        {
            Orders = new List<OrderArticle>();
        }
    }
}