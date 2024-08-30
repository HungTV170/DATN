using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedEmployeeDTO
    {

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Role { get; set; }

    }

    public class EmployeeDTO : CreatedEmployeeDTO
    {
        public int EmployeeId { get; set; }
        public virtual ICollection<OrderDTO> Orders { get; set; }
        public ApiUser ApiUser { get; set; }
    }

    public class UpdateEmployeeDTO : CreatedEmployeeDTO { }
}
