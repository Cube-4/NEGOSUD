using nego.communs.Global;
using nego.communs.Model;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class UserRessource : EntityRessource
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        
        public DateTime DateOfBirth { get; set; }

        public string Token { get; set; }

        public List<int> Roles { get; set; }

        public UserRessource()
        {
            Roles = new List<int>();
        }
    }
}
