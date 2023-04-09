using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MiniETicaret.Application.IRepositories;
using MiniETicaret.Domain.Entities.Common;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories
{
    public class CommandRepository<T> : ICommandRepository<T> where T : BaseEntity
    {
        private readonly MiniETicaretDbContext _context;

        public CommandRepository(MiniETicaretDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<T> AddAsync(T entity)
        {
            await Table.AddAsync(entity);

            await SaveAsync();

            return entity;
        }

        public Task<T> AddRangeAsync(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            T data = await Table.FirstOrDefaultAsync(x => x.Id == id);

            return await Delete(data);
        }

        public async Task<bool> Delete(T entity)
        {
            EntityEntry<T> entityEntry = Table.Remove(entity);

            await _context.SaveChangesAsync();

            return entityEntry.State == EntityState.Deleted;
        }

        public bool DeleteRange(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public T Update(T entity)
        {
            Table.Update(entity);

            return entity;
        }

        public bool UpdateRange(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SaveAsync() => await _context.SaveChangesAsync();
    }
}
