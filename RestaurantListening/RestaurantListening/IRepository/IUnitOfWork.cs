using Microsoft.EntityFrameworkCore.Storage;
using RestaurantListening.Data;
using RestaurantListening.Repository;

namespace RestaurantListening.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Customer> Customers { get; }
        IGenericRepository<Employee> Employees { get; }
        IGenericRepository<MenuItem> MenuItems { get; }
        IGenericRepository<Order> Orders { get; }
        IGenericRepository<OrderItem> OrderItems { get; }
        IGenericRepository<Payment> Payments { get; }
        IGenericRepository<Reservation> Reservations { get; }
        IGenericRepository<Table> Tables { get; }

        IGenericRepository<OrderStatusType> OrderStatusTypes { get; }

        IGenericRepository<OrderTable> OrderTables { get; }
        Task Save();

        Task<IDbContextTransaction> BeginTransactionAsync();
        Task CommitAsync();

        Task RollbackAsync();
    }
}
