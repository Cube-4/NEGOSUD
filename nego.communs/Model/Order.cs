using nego.communs.Global;
using System.Data;


namespace nego.communs.Model
{
    public class Order : Entity
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string ReferenceName { get; set; }
        public virtual List<OrderArticle> Articles { get; set; }
        public int Quantity { get; set; }
        public virtual List<UserOrder> Users { get; set; }
        public Order()
        {
            Articles = new List<OrderArticle>();
            Users = new List<UserOrder>();
        }  
    }
}
