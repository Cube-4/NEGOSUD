using nego.communs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Model
{
    public class Supplier : Entity
    {
        public Supplier(int id, string name, string location, string products, int price)
        {
            Id = id;
            Name = name;
            Location = location;
            Products = products;
            Price = price;
        }

        public string Name { get; set; }
        public string Location { get; set; }
        public string Products { get; set; }
        public int Price { get; set; }
    }

}
