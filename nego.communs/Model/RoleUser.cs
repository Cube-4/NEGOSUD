using nego.communs.Global;


namespace nego.communs.Model
{
    public class RoleUser : Entity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
