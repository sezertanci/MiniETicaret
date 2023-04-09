using Microsoft.EntityFrameworkCore;
using MiniETicaret.Domain.Entities.Common;

namespace MiniETicaret.Application.IRepositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
