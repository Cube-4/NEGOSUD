using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Resource.Other
{
    public class ChangeQuantityRequest
    {
        public ChangeQuantityRequest(int id, int quantity, string type)
        {
            Id = id;
            Quantity = quantity;
            Type = type;
        }

        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Type { get; set; }
    }
}
