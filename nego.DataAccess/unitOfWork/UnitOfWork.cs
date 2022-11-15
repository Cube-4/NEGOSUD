using nego.DataAccess.dbContexte;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.unitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDFactory _dbFactory;

        public UnitOfWork(IDFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task SaveIntoDbContextAsync()
        {
            await _dbFactory.NegodSudDbContext.SaveChangesAsync();
        }
    }
}
