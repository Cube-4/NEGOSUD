using nego.communs.Global;
using nego.communs.Resource;
using System.Data;


namespace nego.communs.Model
{
    public class OrderRessource : EntityRessource
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string ReferenceName { get; set; }
        public string SupplierName { get; set; }
        public List<OrderArticle> Articles { get; set; }
        public OrderRessource()
        {
            Articles = new List<OrderArticle>();
        }  
    }
}
