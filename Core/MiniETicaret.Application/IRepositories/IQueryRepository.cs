using MiniETicaret.Application.DTOs;
using MiniETicaret.Application.RequestModels;
using MiniETicaret.Domain.Entities.Common;
using System.Linq.Expressions;

namespace MiniETicaret.Application.IRepositories
{
    public interface IQueryRepository<T> : IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll(bool tracking = true);
        Task<List<T>> GetList(Pagination pagination, bool tracking = true);
        Task<PaginationView<T>> GetListWithPaging(Pagination pagination, bool tracking = true);
        IQueryable<T> GetWhere(Expression<Func<T, bool>> filter, bool tracking = true);
        Task<T> GetByIdAsync(Guid id, bool tracking = true);
        Task<T> GetSingleAsync(Expression<Func<T, bool>> filter, bool tracking = true);
    }
}
