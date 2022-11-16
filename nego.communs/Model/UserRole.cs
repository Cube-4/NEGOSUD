using nego.communs.Global;


namespace nego.communs.Model
{
    public class UserRole : Entity
    {
        public UserRole(int id, int userId, int roleId)
        {
            Id = id;
            UserId = userId;
            RoleId = roleId;
        }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
