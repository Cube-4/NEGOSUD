using System.ComponentModel.DataAnnotations;

namespace nego.communs.Resource
{
    public class AuthenticateRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
