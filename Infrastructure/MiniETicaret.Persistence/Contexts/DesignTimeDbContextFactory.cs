using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MiniETicaret.Persistence.Contexts
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MiniETicaretDbContext>
    {
        public MiniETicaretDbContext CreateDbContext(string[] args)
        {
            DbContextOptionsBuilder<MiniETicaretDbContext> dbContextOptionsBuilder = new();

            dbContextOptionsBuilder.UseNpgsql(Configuration.ConnectionString);

            return new(dbContextOptionsBuilder.Options);
        }
    }
}
