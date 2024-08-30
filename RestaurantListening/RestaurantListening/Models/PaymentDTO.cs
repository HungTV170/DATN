using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedPaymentDTO
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string PaymentMethod { get; set; }

    }

    public class PaymentDTO : CreatedPaymentDTO
    {
        public int PaymentId { get; set; }

        public DateTime PaymentDate { get; set; }

        public OrderDTO Order { get; set; }

    }
    public class UpdatePaymentDTO : CreatedPaymentDTO { }
}
