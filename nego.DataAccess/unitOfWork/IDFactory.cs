﻿using nego.DataAccess.dbContexte;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.unitOfWork
{
    public interface IDFactory
    {
        NegoSudDbContext NegodSudDbContext { get; }
    }
}
