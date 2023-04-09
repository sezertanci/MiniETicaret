using MiniETicaret.Application.IRepositories.ICustomer;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.CustomerRepository
{
    public class CustomerQueryRepository : QueryRepository<Customer>, ICustomerQueryRepository
    {
        public CustomerQueryRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
