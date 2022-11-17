using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class ArticleRessource : EntityRessource
    {
        [Required]
        public string Name { get; set; }
        public string Family { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Origin { get; set; }
        public int Quantity { get; set; }
    }

}
