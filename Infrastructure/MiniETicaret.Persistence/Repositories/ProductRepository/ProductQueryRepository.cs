using MiniETicaret.Application.IRepositories.IProduct;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.ProductRepository
{
    public class ProductQueryRepository : QueryRepository<Product>, IProductQueryRepository
    {
        public ProductQueryRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
