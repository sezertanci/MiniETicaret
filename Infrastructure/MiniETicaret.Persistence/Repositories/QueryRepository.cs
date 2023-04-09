using Microsoft.EntityFrameworkCore;
using MiniETicaret.Application.DTOs;
using MiniETicaret.Application.IRepositories;
using MiniETicaret.Application.RequestModels;
using MiniETicaret.Domain.Entities.Common;
using MiniETicaret.Persistence.Contexts;
using System.Linq.Expressions;

namespace MiniETicaret.Persistence.Repositories
{
    public class QueryRepository<T> : IQueryRepository<T> where T : BaseEntity
    {
        private readonly MiniETicaretDbContext _context;

        public QueryRepository(MiniETicaretDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll(bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();

            if(!tracking)
                query = query.AsNoTracking();

            return query;
        }

        public async Task<T> GetByIdAsync(Guid id, bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();

            if(!tracking)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<T>> GetList(Pagination pagination, bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();

            query = query.Skip(pagination.Size * pagination.Page).Take(pagination.Size);

            if(!tracking)
                query = query.AsNoTracking();

            return await query.ToListAsync();
        }

        public async Task<PaginationView<T>> GetListWithPaging(Pagination pagination, bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();

            int totalRow = query.Count();

            query = query.Skip(pagination.Size * pagination.Page).Take(pagination.Size);

            if(!tracking)
                query = query.AsNoTracking();

            PaginationView<T> paginationView = new()
            {
                Items = await query.ToListAsync(),
                TotalRow = totalRow
            };

            return paginationView;
        }

        //public async Task<T> GetByIdAsync(Guid id) => await Table.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            IQueryable<T> query = Table.AsQueryable();

            if(!tracking)
                query = query.AsNoTracking();

            return await query.SingleAsync(filter);
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            IQueryable<T> query = Table.Where(filter);

            if(!tracking)
                query = query.AsNoTracking();

            return query;
        }
    }
}
