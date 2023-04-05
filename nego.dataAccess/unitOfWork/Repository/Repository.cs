using Microsoft.EntityFrameworkCore;
using nego.DataAccess.dbContexte;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace nego.dataAccess.unitOfWork.Repository
{
    public class Repository : IRepository<NegoSudDbContext>
    {
        public NegoSudDbContext context { get; }

        public Repository(NegoSudDbContext context)
        {
            this.context = context;
        }

        public void Add<T>(T data) where T : class
        {
            context.Set<T>().Add(data);
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return context.Set<T>().AsQueryable();
        }

        public T GetOne<T>
            (
                Expression<Func<T, bool>> filter, 
                params Expression<Func<T, object>>[] includes
            ) where T : class
        {
            var query = context.Set<T>().AsQueryable();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query.FirstOrDefault(filter);
        }

        public void Remove<T>(T data) where T : class
        {
            context.Set<T>().Remove(data);
        }

        public void Update<T>(T data) where T : class
        {
            context.Set<T>().Update(data);
        }
    }
}
