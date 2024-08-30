using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Data
{
    public class MenuItem
    {
        [Key]
        public int ItemId { get; set; } 
        public string Name { get; set; } 
        public string Description { get; set; } 
        public decimal Price { get; set; } 
        public string Category { get; set; } 
        public string ItemImg { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }

}
