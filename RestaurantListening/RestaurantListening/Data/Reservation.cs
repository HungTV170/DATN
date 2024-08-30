using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListening.Data
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        [ForeignKey(nameof(Customer))]
        public int CustomerId { get; set; }

        [ForeignKey(nameof(Table))]
        public int TableId { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan ReservationTime { get; set; }
        public int NumberOfPeople { get; set; }

        public Customer Customer { get; set; }
        public Table Table { get; set; }
    }

}
