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
        [Required]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Email { get; set; }
        public List<int> Roles { get; set; }

        public UserRessource()
        {
            Roles = new List<int>();
        }
    }
}
