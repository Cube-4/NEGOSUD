using nego.communs.Global;
using System.Data;


namespace nego.communs.Model
{
    public class Order : Entity
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string ReferenceName { get; set; }
        public double OrderTotal { get; set; }
        public string OrderStatus { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual List<ArticleOrder> Articles { get; set; }
        
        public Order()
        {
            Articles = new List<ArticleOrder>();
        }  
    }
}
