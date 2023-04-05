using nego.communs.resource;
using Newtonsoft.Json;

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
        public List<OrderRessource> Orders { get; set; }
        
        public UserRessource()
        {
            Roles = new List<int>();
            Articles = new List<ArticleRessource>();
            Orders = new List<OrderRessource>();
        }
    }
}
