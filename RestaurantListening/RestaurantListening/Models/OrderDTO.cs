using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListening.Models
{
    public class CreatedOrderDTO 
    {
        [Required]
        public int CustomerId { get; set; }

        [Required]

        public int EmployeeId { get; set; }


        [Required]
        [Range(0, 3, ErrorMessage = "StatusId must be between 0 and 3.")]
        public OrderStatus StatusId { get; set; }


    }
    //public class OrderDTO : CreatedOrderDTO
    //{
    //    public int OrderId { get; set; }

    //    public DateTime OrderDate { get; set; }

    //    public OrderStatusType Status { get; set; }

    //    public CustomerDTO Customer { get; set; }
    //    public TableDTO Table { get; set; }
    //    public EmployeeDTO Employee { get; set; }
    //    public ICollection<OrderItemDTO> OrderItems { get; set; }
    //    public PaymentDTO Payment { get; set; }
    //}
    public class CreatedFullOrderDTO
    {
        public CreatedOrderDTO order { get; set; }
        public List<CreatedOrderItemDTO> orderItems { get; set; }
        public List<CreatedOrderTableDTO> orderTables { get; set; }
    }

    public class UpdateOrderDTO : CreatedOrderDTO { }

    public class OrderDTO : CreatedOrderDTO
    {
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        public string Status { get; set; }

        public string Customer { get; set; }

        public string SDT { get; set; }

        public string Table { get; set; }

        public ICollection<OrderTableDTO> OrderTables { get; set; }
        public string Employee { get; set; }
        public ICollection<OrderItemDTO> OrderItems { get; set; }
        public PaymentDTO Payment { get; set; }
    }

}
