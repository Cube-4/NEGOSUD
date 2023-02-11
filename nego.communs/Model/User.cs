using nego.communs.Global;

namespace nego.communs.Model
{
    public class User : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public virtual List<RoleUser> Roles { get; set; }
        public virtual List<UserOrder> Orders { get; set; }
        public virtual List<Article> Articles { get; set; }
        public int ArticlesQuantity { get; set; }
        public User()
        {
            Roles = new List<RoleUser>();
            Orders = new List<UserOrder>();
            Articles = new List<Article>();
        }
    }

}
