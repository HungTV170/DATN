using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListening.Data
{
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }

        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }

        [ForeignKey(nameof(MenuItem))]
        public int ItemId { get; set; }
        public int Quantity { get; set; }

        [Column("PromotionalPrice")]
        public decimal Price { get; set; }

        public Order Order { get; set; }
        public MenuItem MenuItem { get; set; }

    }

}
