using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedOrderItemDTO
    {

        [Required]
        public int OrderId { get; set; }

        [Required]
        public int ItemId { get; set; }

        [Required]
        [Range(1, 5, ErrorMessage = "Quantity must be between 1 and 5.")]
        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
    public class OrderItemDTO : CreatedOrderItemDTO
    {
        public int OrderItemId { get; set; }

        public OrderDTO Order { get; set; }
        public string MenuItem { get; set; }
        public string FileName { get; set; }
    }

    public class UpdateOrderItemDTO : CreatedOrderItemDTO { }
}
