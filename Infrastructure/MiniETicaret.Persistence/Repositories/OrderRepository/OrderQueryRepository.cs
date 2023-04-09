using MiniETicaret.Application.IRepositories.IOrder;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.OrderRepository
{
    public class OrderQueryRepository : QueryRepository<Order>, IOrderQueryRepository
    {
        public OrderQueryRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
