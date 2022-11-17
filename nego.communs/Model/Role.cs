using nego.communs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Model
{
    public class Role : Entity
    {
        public string Name { get; set; }
        public List<UserRole> Users { get; set; }
        
        public Role()
        {
            Users = new List<UserRole>();
        }
    }
}
