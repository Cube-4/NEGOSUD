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

        public T GetOne<T>(Expression<Func<T, bool>> filter) where T : class
        {
            return context.Set<T>().FirstOrDefault(filter);
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
