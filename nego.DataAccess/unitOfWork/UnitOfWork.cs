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
        private readonly NegoSudDbContext _db;

        public UnitOfWork(NegoSudDbContext db)
        {
            _db = db;
        }

        public async Task SaveIntoDbContextAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
