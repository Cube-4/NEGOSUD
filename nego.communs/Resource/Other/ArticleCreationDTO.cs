using nego.communs.resource;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource.Other
{
    public class ArticleCreationDTO : EntityRessource
    {
        [Required]
        public string Name { get; set; }
        public string Reference { get; set; }
        public DateTime Date { get; set; }
        public string Origin { get; set; }
        public int Stock { get; set; }

        [Required]
        public float Price { get; set; }
        [Required]
        public int UserId { get; set; }
    }

}
