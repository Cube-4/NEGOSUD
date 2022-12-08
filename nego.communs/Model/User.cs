using nego.communs.Global;

namespace nego.communs.Model
{
    public class User : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public virtual List<RoleUser> Roles { get; set; }

        public User()
        {
            Roles = new List<RoleUser>();
        }
    }

}
