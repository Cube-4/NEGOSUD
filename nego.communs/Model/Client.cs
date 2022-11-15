using nego.communs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Model
{
    public class Client : Entity
    {
        public Client(int id, string firstName, string lastName, DateTime dateOfBirth, string email, bool enable)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Email = email;
            Enable = enable;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public bool Enable { get; set; }
    }

}
