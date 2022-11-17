using nego.communs.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace nego.dataAccess.unitOfWork.Repository
{
    public interface IRepository<u>
    {
        u context { get; }
        T GetOne<T>(Expression<Func<T, bool>> filter) where T : class;
        IQueryable<T> GetAll<T>() where T : class;
        void Add<T>(T data) where T : class;
        void Update<T>(T data) where T : class;
        void Remove<T>(T data) where T : class;
    }
}
