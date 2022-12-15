using nego.communs.Global;
using nego.communs.Model;
using nego.communs.Resource;
using System.Data;


namespace nego.communs.resource
{
    public class OrderRessource : EntityRessource
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string ReferenceName { get; set; }
        public List<int> Articles { get; set; }
        public int Quantity { get; set; }
        public List<int> Users { get; set; }

        public OrderRessource()
        {
            Articles = new List<int>();
            Users = new List<int>();
        }  
    }
}
