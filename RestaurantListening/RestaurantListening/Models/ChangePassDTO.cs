using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class ChangePassDTO
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
