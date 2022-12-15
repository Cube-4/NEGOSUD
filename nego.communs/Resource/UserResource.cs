using nego.communs.Global;
using nego.communs.Model;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class UserRessource : EntityRessource
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public List<int> Roles { get; set; }
        public List<int> Orders { get; set; }
        public List<int> Articles { get; set; }
        public int ArticlesQuantity { get; set; }

        public UserRessource()
        {
            Roles = new List<int>();
            Orders = new List<int>();
            Articles = new List<int>();
        }
    }
}
