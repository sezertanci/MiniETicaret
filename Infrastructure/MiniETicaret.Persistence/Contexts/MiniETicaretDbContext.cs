using Microsoft.EntityFrameworkCore;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Domain.Entities.Common;

namespace MiniETicaret.Persistence.Contexts
{
    public class MiniETicaretDbContext : DbContext
    {
        public MiniETicaretDbContext(DbContextOptions options) : base(options)
        {
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entities = ChangeTracker.Entries<BaseEntity>();

            foreach(var entity in entities)
            {
                _ = entity.State switch
                {
                    EntityState.Added => entity.Entity.CreatedDate = DateTime.UtcNow,
                    _ => DateTime.UtcNow
                };
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
