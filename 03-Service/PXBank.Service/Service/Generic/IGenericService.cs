using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Service.Service.Generic
{
    public interface IGenericService<T> where T : class
    {
        Task<T> Find(int id);
        Task<List<T>> List();
        Task<List<T>> ListWhere(Expression<Func<T, bool>> predicate);
        Task<List<T>> ListWhereOrderBy<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector);
        Task<IQueryable<T>> ListWhereOrderByQueryable<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector);
        Task Add(T item);
        Task Remove(int id);
        Task Remove(T item);
        Task Edit(T item);
        Task AddRange(List<T> list);
        Task RemoveRange(List<T> list);
        Task EditRange(List<T> list);
        Task<List<T>> ListWhereNoTracking(Expression<Func<T, bool>> predicate);
        Task<int> Count<TKey>(Expression<Func<T, TKey>> keySelector);
        Task<int> CountWhere<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector);
        IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount);

    }
}