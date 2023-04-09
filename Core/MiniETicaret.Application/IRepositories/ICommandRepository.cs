using MiniETicaret.Domain.Entities.Common;

namespace MiniETicaret.Application.IRepositories
{
    public interface ICommandRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<T> AddAsync(T entity);
        Task<T> AddRangeAsync(List<T> entities);
        Task<bool> Delete(T entity);
        bool DeleteRange(List<T> entities);
        T Update(T entity);
        bool UpdateRange(List<T> entities);
        Task<bool> DeleteAsync(Guid id);
        Task<int> SaveAsync();
    }
}
