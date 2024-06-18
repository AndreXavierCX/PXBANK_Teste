using Microsoft.EntityFrameworkCore;
using PXBank.Business.Context.Interface;
using PXBank.Business.Context;
using PXBank.Business.CustomException;
using PXBank.Business.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Reflection;

namespace PXBank.Business.Repository.Generic
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected DataContext _context;

        #region Ctor
        public GenericRepository(IUnitOfWork unitOfWork)
        {
            if (unitOfWork == null)
                throw new ArgumentNullException("unitOfWork");

            _context = unitOfWork as DataContext;
        }
        #endregion

        public virtual async Task<TEntity> Find(int id)
        {
            try
            {
                return await _context.Set<TEntity>().FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual IQueryable<TEntity> List()
        {
            try
            {
                return _context.Set<TEntity>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual IQueryable<TEntity> ListWhere(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                return _context.Set<TEntity>().Where(predicate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual IQueryable<TEntity> ListWhereOrderBy<TKey>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TKey>> keySelector)
        {
            try
            {
                return _context.Set<TEntity>().Where(predicate).OrderBy(keySelector);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task<int> Count<TKey>(Expression<Func<TEntity, TKey>> keySelector)
        {
            try
            {
                return await _context.Set<TEntity>().AsNoTracking().Select(keySelector).CountAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task<int> CountWhere<TKey>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TKey>> keySelector)
        {
            try
            {
                return await _context.Set<TEntity>().AsNoTracking().Where(predicate).Select(keySelector).CountAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task Add(TEntity item)
        {
            try
            {
                _context.Set<TEntity>().Add(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task AddRange(List<TEntity> list)
        {
            try
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        _context.Set<TEntity>().AddRange(list);
                        await _context.SaveChangesAsync();
                        dbContextTransaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        await dbContextTransaction.RollbackAsync();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task Remove(TEntity item)
        {
            try
            {
                _context.Set<TEntity>().Remove(item);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                switch (((SqlException)e.InnerException).Number)
                {
                    //Erro de Foreng key na exclusão
                    case 547:
                        {
                            throw new CustomException.CustomException(Business.Constantes.Erro.RegistrosRelacionados, Business.Constantes.Erro.GetValue(Business.Constantes.Erro.RegistrosRelacionados));
                        }
                    case 2627: //Erro de Trigger
                        {
                            throw new CustomException.CustomException(Business.Constantes.Erro.RegistrosRelacionados, Business.Constantes.Erro.GetValue(Business.Constantes.Erro.RegistrosRelacionados));
                        }
                    default:
                        {
                            throw new Exception(e.ToString());
                        }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task RemoveRange(List<TEntity> list)
        {
            try
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        _context.Set<TEntity>().RemoveRange(list);
                        await _context.SaveChangesAsync();
                        dbContextTransaction.Commit();
                    }
                    catch (DbUpdateException e)
                    {
                        await dbContextTransaction.RollbackAsync();
                        switch (((SqlException)e.InnerException).Number)
                        {
                            //Erro de Foreng key na exclusão
                            case 547:
                                {
                                    throw new CustomException.CustomException(Business.Constantes.Erro.RegistroChave, Business.Constantes.Erro.GetValue(Business.Constantes.Erro.RegistroChave));
                                }
                            case 2627: //Erro de Trigger
                                {
                                    throw new CustomException.CustomException(Business.Constantes.Erro.RegistroChave, Business.Constantes.Erro.GetValue(Business.Constantes.Erro.RegistroChave));
                                }
                            default:
                                {
                                    throw new Exception(e.ToString());
                                }
                        }
                    }
                    catch (Exception ex)
                    {
                        await dbContextTransaction.RollbackAsync();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task Edit(TEntity item)
        {
            try
            {
                var registro = _context.Set<TEntity>().Update(item);
                registro.State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task EditRange(List<TEntity> list)
        {
            try
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        _context.Set<TEntity>().UpdateRange(list);
                        await _context.SaveChangesAsync();
                        dbContextTransaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        await dbContextTransaction.RollbackAsync();
                        throw ex;
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount)
        {
            var pos = pageSize * (pageNumber);

            totalCount = _context.Set<TEntity>().Where(predicate).Count();

            if (sortOrder == "desc" && !string.IsNullOrEmpty(sortField))
                return _context.Set<TEntity>().Where(predicate).OrderByDescending(sortField).Skip(pos).Take(pageSize);
            else if (!string.IsNullOrEmpty(sortField))
                return _context.Set<TEntity>().Where(predicate).OrderBy(sortField).Skip(pos).Take(pageSize);
            else
                return _context.Set<TEntity>().Where(predicate).Skip(pos).Take(pageSize);
        }


    public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
            GC.SuppressFinalize(this);
        }

    }
}