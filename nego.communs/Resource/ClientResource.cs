using nego.communs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Resource
{
    public class ClientRessource : Entity
    {
        public List<int> Roles { get; set; }

        public ClientRessource()
        {
            Roles = new List<int>();
        }
    }
}
