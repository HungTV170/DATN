using Microsoft.EntityFrameworkCore.Storage;
using RestaurantListening.Data;
using RestaurantListening.IRepository;

namespace RestaurantListening.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RestaurantDbContext _context;
        private IDbContextTransaction _transaction;
        private IGenericRepository<Customer> _customers;
        private IGenericRepository<Employee> _employees;
        private IGenericRepository<MenuItem> _menuItems;
        private IGenericRepository<Order> _orders;
        private IGenericRepository<OrderItem> _orderItems;
        private IGenericRepository<Payment> _payments;
        private IGenericRepository<Reservation> _reservations;
        private IGenericRepository<Table> _tables;
        private IGenericRepository<OrderStatusType> _orderStatusType;
        private IGenericRepository<OrderTable> _orderTable;
        public UnitOfWork(RestaurantDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<Customer> Customers => _customers ??= new GenericRepository<Customer>(_context);

        public IGenericRepository<Employee> Employees => _employees ??= new GenericRepository<Employee>(_context);

        public IGenericRepository<MenuItem> MenuItems => _menuItems ??= new GenericRepository<MenuItem>(_context);

        public IGenericRepository<Order> Orders => _orders ??= new GenericRepository<Order>(_context);

        public IGenericRepository<OrderItem> OrderItems => _orderItems ??= new GenericRepository<OrderItem>(_context);

        public IGenericRepository<Payment> Payments => _payments ??= new GenericRepository<Payment>(_context);

        public IGenericRepository<Reservation> Reservations => _reservations ??= new GenericRepository<Reservation>(_context);

        public IGenericRepository<Table> Tables => _tables ??= new GenericRepository<Table>(_context);

        public IGenericRepository<OrderStatusType> OrderStatusTypes => _orderStatusType ??= new GenericRepository<OrderStatusType>(_context);

        public IGenericRepository<OrderTable> OrderTables => _orderTable ??= new GenericRepository<OrderTable>(_context);
        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _context.Database.BeginTransactionAsync();
        }


        public async Task CommitAsync()
        {
            try
            {
                await _transaction.CommitAsync();
            }
            catch
            {
                await RollbackAsync();
                throw;
            }
            finally
            {
                await _transaction.DisposeAsync();
            }
        }

        public async Task RollbackAsync()
        {
            await _transaction.RollbackAsync();
            await _transaction.DisposeAsync();
        }
    }
}
