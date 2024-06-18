using Microsoft.EntityFrameworkCore;
using PXBank.Business.Context;
using PXBank.Business.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Service.Service.Generic
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        public IGenericRepository<T> _repository;

        public GenericService(DataContext _context)
        {
            _repository = new GenericRepository<T>(_context);
        }

        public void Dispose()
        {
            if (_repository != null)
            {
                _repository.Dispose();
            }
        }

        public virtual async Task<T> Find(int id)
        {
            return await _repository.Find(id);
        }

        public virtual async Task<List<T>> List()
        {
            return await _repository.List().ToListAsync();
        }

        public virtual async Task<List<T>> ListWhere(Expression<Func<T, bool>> predicate)
        {
            return await _repository.ListWhere(predicate).ToListAsync();
        }

        public virtual async Task<List<T>> ListWhereNoTracking(Expression<Func<T, bool>> predicate)
        {
            return await _repository.ListWhere(predicate).AsNoTracking().ToListAsync();
        }

        public virtual async Task<List<T>> ListWhereOrderBy<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector)
        {
            return await _repository.ListWhereOrderBy(predicate, keySelector).ToListAsync();
        }
        public async Task<IQueryable<T>> ListWhereOrderByQueryable<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector)
        {
            return _repository.ListWhereOrderBy(predicate, keySelector);
        }

        public virtual async Task<int> Count<TKey>(Expression<Func<T, TKey>> keySelector)
        {
            return await _repository.Count(keySelector);
        }

        public virtual async Task<int> CountWhere<TKey>(Expression<Func<T, bool>> predicate, Expression<Func<T, TKey>> keySelector)
        {
            return await _repository.CountWhere(predicate, keySelector);
        }

        public virtual async Task Add(T item)
        {
            await _repository.Add(item);
        }

        public virtual async Task AddRange(List<T> list)
        {
            await _repository.AddRange(list);
        }
        public virtual async Task Remove(int id)
        {
            try
            {
                var entity = await _repository.Find(id);
                await _repository.Remove(entity);
            }
            catch (DbUpdateException ex)
            {
                string erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";

                var sqlException = (SqlException)ex.InnerException.InnerException;
                if (sqlException.Errors.Count > 0) // Assume the interesting stuff is in the first error
                {
                    switch (sqlException.Errors[0].Number)
                    {
                        case 547: // Foreign Key violation
                            erro = "Existem outros registros relacionados ao item selecionado.";
                            break;
                        case 2601: // Primary key violation
                            erro = "Este item é chave da tabela.";
                            break;
                        default:
                            erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";
                            break;
                    }
                }

                throw new Exception(String.Format("Não foi possível realizar a exclusão do registro. {0}", erro));
            }
        }

        public virtual async Task RemoveRange(List<T> list)
        {
            try
            {
                await _repository.RemoveRange(list);
            }
            catch (DbUpdateException ex)
            {
                string erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";

                var sqlException = (SqlException)ex.InnerException.InnerException;
                if (sqlException.Errors.Count > 0) // Assume the interesting stuff is in the first error
                {
                    switch (sqlException.Errors[0].Number)
                    {
                        case 547: // Foreign Key violation
                            erro = "Existem outros registros relacionados ao item selecionado.";
                            break;
                        case 2601: // Primary key violation
                            erro = "Este item é chave da tabela.";
                            break;
                        default:
                            erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";
                            break;
                    }
                }

                throw new Exception(String.Format("Não foi possível realizar a exclusão do registro. {0}", erro));
            }
        }

        public virtual async Task Edit(T item)
        {
            try
            {
                await _repository.Edit(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task EditRange(List<T> list)
        {
            try
            {
                await _repository.EditRange(list);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task Remove(T item)
        {
            try
            {
                await _repository.Remove(item);
            }
            catch (DbUpdateException ex)
            {
                string erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";

                var sqlException = (SqlException)ex.InnerException.InnerException;
                if (sqlException.Errors.Count > 0) // Assume the interesting stuff is in the first error
                {
                    switch (sqlException.Errors[0].Number)
                    {
                        case 547: // Foreign Key violation
                            erro = "Existem outros registros relacionados ao item selecionado.";
                            break;
                        case 2601: // Primary key violation
                            erro = "Este item é chave da tabela.";
                            break;
                        default:
                            erro = "Ocorreu um erro inesperado, envie um e-mail para suporte@asftech.com.br";
                            break;
                    }
                }

                throw new Exception(String.Format("Não foi possível realizar a exclusão do registro. {0}", erro));
            }
        }

        public  IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate, string sortOrder, string sortField, int pageNumber, int pageSize, ref int totalCount)
        {
            return _repository.GetAll(predicate, sortOrder, sortField, pageNumber, pageSize, ref totalCount);
        }

    }
}
