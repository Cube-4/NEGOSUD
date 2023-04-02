using nego.communs.Resource;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.resource
{
    public class OrderRessource : EntityRessource
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string ReferenceName { get; set; }
        public string OrderType { get; set; }
        public double OrderTotal { get; set; }
        public string OrderStatus { get; set; }

        [Required]
        public int UserId { get; set; }
        public List<ArticleRessource> Articles { get; set; }

        public OrderRessource()
        {
            Articles = new List<ArticleRessource>();
        }  
    }
}
