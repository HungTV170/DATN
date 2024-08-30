using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace RestaurantListening.Data
{
    public enum OrderStatus
    {
        Pending,
        Processing,
        Completed,
        Cancelled
    }
    public class OrderStatusType
    {
        [Key]
        public OrderStatus StatusId { get; set; }
        public string Type { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }


        [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }
        public DateTime OrderDate { get; set; } = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"));

        [ForeignKey(nameof(OrderStatusType))]
        public OrderStatus StatusId { get; set; }
        public virtual OrderStatusType Status { get; set; }

        public Customer Customer { get; set; }
        public virtual ICollection<OrderTable> OrderTables { get; set; }
        public Employee Employee { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public Payment Payment { get; set; }
    }
    public class OrderTable
    {
        [Key]
        public int OrderTableId { get; set; }

        [ForeignKey(nameof(Table))]
        public int TableId { get; set; }

        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }

        public Order Order { get; set; }

        public Table Table { get; set; }
    }
}
