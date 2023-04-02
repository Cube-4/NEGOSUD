using nego.communs.Resource;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource.Other
{
    public class OrderCreationDTO : EntityRessource
    {
        public string OrderName { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderType { get; set; }
        public string ReferenceName { get; set; }

        [Required]
        public int UserId { get; set; }

        public OrderCreationDTO()
        {
        }
    }
}
