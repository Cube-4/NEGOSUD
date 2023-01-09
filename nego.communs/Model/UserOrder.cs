using nego.communs.Global;

namespace nego.communs.Model
{
    public class UserOrder : Entity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
