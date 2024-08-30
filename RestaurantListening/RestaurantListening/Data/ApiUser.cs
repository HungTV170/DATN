using Microsoft.AspNetCore.Identity;

namespace RestaurantListening.Data
{
    public class ApiUser : IdentityUser
    {
        public int? EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
