using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CustomerDTO : CreatedCustomerDTO
    {

        public int CustomerId { get; set; }

        public ICollection<OrderDTO> Orders { get; set; }
        public ICollection<ReservationDTO> Reservations { get; set; }
    }

    public class CreatedCustomerDTO
    {

        [Required]
        [StringLength(20, ErrorMessage = "First name is too loong")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Last name is too loong")]
        public string LastName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Phone Number is too loong")]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Email is too loong")]
        public string Email { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Address is too loong")]
        public string Address { get; set; }
    }

    public class UpdateCustomerDTO : CreatedCustomerDTO { }
}
