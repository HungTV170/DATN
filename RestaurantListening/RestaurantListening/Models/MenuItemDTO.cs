using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedMenuItemDTO
    {
        [Required]
        [StringLength(50, ErrorMessage = "Name too loong")]
        public string Name { get; set; }

        [Required]
        [StringLength(1000, ErrorMessage = "Description is too loong")]
        public string Description { get; set; }
        
        [Required]
        public decimal Price { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Price is too loong")]
        public string Category { get; set; } 

        public IFormFile? ImgFile { get; set; }

    }

    public class MenuItemDTO 
    {
        public int ItemId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Name too loong")]
        public string Name { get; set; }

        [Required]
        [StringLength(1000, ErrorMessage = "Description is too loong")]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Price is too loong")]
        public string Category { get; set; }

        public string? ItemImg { get; set; }
        public ICollection<OrderItemDTO> OrderItems { get; set; }
    }

    public class UpdateMenuItemDTO : CreatedMenuItemDTO 
    { 
        public string? ItemImg { get; set; }
    }
}
