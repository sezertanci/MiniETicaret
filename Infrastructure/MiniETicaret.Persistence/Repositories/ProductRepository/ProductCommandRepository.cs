using MiniETicaret.Application.IRepositories.IProduct;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.ProductRepository
{
    public class ProductCommandRepository : CommandRepository<Product>, IProductCommandRepository
    {
        public ProductCommandRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
