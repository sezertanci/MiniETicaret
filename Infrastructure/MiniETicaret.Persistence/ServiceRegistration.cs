using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MiniETicaret.Application.IRepositories.ICustomer;
using MiniETicaret.Application.IRepositories.IOrder;
using MiniETicaret.Application.IRepositories.IProduct;
using MiniETicaret.Persistence.Contexts;
using MiniETicaret.Persistence.Repositories.CustomerRepository;
using MiniETicaret.Persistence.Repositories.OrderRepository;
using MiniETicaret.Persistence.Repositories.ProductRepository;

namespace MiniETicaret.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddDbContext<MiniETicaretDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));
            services.AddScoped<IProductCommandRepository, ProductCommandRepository>();
            services.AddScoped<IProductQueryRepository, ProductQueryRepository>();
            services.AddScoped<IOrderCommandRepository, OrderCommandRepository>();
            services.AddScoped<IOrderQueryRepository, OrderQueryRepository>();
            services.AddScoped<ICustomerCommandRepository, CustomerCommandRepository>();
            services.AddScoped<ICustomerQueryRepository, CustomerQueryRepository>();
        }
    }
}
