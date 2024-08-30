using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListening.Data
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }

        public Order Order { get; set; }
    }

}
