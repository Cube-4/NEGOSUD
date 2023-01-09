using nego.communs.Global;
using nego.communs.Model;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class ArticleRessource : EntityRessource
    {
        [Required]
        public string Name { get; set; }
        public string Reference { get; set; }
        public DateTime Date { get; set; }
        public string Origin { get; set; }
        public int Quantity { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public int UserId { get; set; }
    }

}
