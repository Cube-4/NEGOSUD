using nego.communs.resource;
using Newtonsoft.Json;

namespace nego.communs.Resource.Other
{
    public class UserCreationDTO : EntityRessource
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public List<int> Roles { get; set; }

        public UserCreationDTO()
        {
            Roles = new List<int>();
        }
    }
}
