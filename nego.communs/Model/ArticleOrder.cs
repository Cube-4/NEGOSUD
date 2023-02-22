using nego.communs.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.communs.Model
{
    public class ArticleOrder : Entity
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ArticleId { get; set; }
        public Article Article { get; set; }
        public int Quantity { get; set; }
    }
}
