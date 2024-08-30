using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedOrderTableDTO
    {
        [Required]
            public int TableId { get; set; }
        [Required]
            public int OrderId { get; set; }

    }

    public class OrderTableDTO : CreatedOrderTableDTO
    {
        public int OrderTableId { get; set; }

        public OrderDTO Order { get; set; }

        public string Table { get; set; }
    }

    public class UpdateOrderTableDTO : CreatedOrderTableDTO { }
}
