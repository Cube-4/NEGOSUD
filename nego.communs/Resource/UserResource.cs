using nego.communs.Global;
using nego.communs.Model;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class UserRessource : EntityRessource
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        
        public DateTime DateOfBirth { get; set; }

        public string Token { get; set; }

        public List<int> Roles { get; set; }

        public List<ArticleRessource> Articles { get; set; }

        public UserRessource()
        {
            Roles = new List<int>();
            Articles = new List<ArticleRessource>();
        }
    }
}
