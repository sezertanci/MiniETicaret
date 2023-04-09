using MiniETicaret.Application.IRepositories.IOrder;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.OrderRepository
{
    public class OrderCommandRepository : CommandRepository<Order>, IOrderCommandRepository
    {
        public OrderCommandRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
