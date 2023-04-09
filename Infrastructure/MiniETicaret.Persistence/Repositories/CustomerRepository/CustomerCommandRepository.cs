using MiniETicaret.Application.IRepositories.ICustomer;
using MiniETicaret.Domain.Entities;
using MiniETicaret.Persistence.Contexts;

namespace MiniETicaret.Persistence.Repositories.CustomerRepository
{
    public class CustomerCommandRepository : CommandRepository<Customer>, ICustomerCommandRepository
    {
        public CustomerCommandRepository(MiniETicaretDbContext context) : base(context)
        {
        }
    }
}
