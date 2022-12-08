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
        public List<int> Orders { get; set; }

        public ArticleRessource()
        {
            Orders = new List<int>();
        }
    }

}
