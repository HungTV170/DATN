using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Configurations.Entities;

namespace RestaurantListening.Data
{
    public class RestaurantDbContext : IdentityDbContext<ApiUser>
    {
        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
        }
        public DbSet<Customer> customers { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderStatusType> orderStatusTypes { get; set; }

        public DbSet<Employee> employees { get; set; }
        public DbSet<MenuItem> menuItems { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }
        public DbSet<Table> tables { get; set; }
        public DbSet<Payment> payments { get; set; }

        public DbSet<Reservation> reservations { get; set; }


    }
}
