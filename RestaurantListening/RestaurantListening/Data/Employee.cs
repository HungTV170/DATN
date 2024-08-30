using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Data
{
    public class Employee 
    {
        [Key]
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public ApiUser ApiUser { get; set; }
    }

}
