using nego.communs.Global;
using System.Text.Json.Serialization;

namespace nego.communs.Model
{
    public class User : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        
        public virtual List<RoleUser> Roles { get; set; }
        public virtual List<Order> Orders { get; set; }
        public virtual List<Article> Articles { get; set; }
        public int ArticlesQuantity { get; set; }
        
        public User()
        {
            Roles = new List<RoleUser>();
            Orders = new List<Order>();
            Articles = new List<Article>();
        }
    }

}
