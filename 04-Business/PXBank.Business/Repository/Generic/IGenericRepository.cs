using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Repository.Generic
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Find(int id);
        IQueryable<TEntity> List();
        IQueryable<TEntity> ListWhere(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> ListWhereOrderBy<TKey>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TKey>> keySelector);
        Task Add(TEntity item);
        Task Remove(TEntity item);
        Task Edit(TEntity item);
        Task AddRange(List<TEntity> list);
        Task RemoveRange(List<TEntity> list);
        Task EditRange(List<TEntity> list);
        Task<int> Count<TKey>(Expression<Func<TEntity, TKey>> keySelector);
        Task<int> CountWhere<TKey>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TKey>> keySelector);
        IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount);
        void Dispose();
    }
}