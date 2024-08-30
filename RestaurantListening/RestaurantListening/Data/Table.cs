using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Data
{
    public class Table
    {
        [Key]
        public int TableId { get; set; }
        public int TableNumber { get; set; }
        public int Seats { get; set; }
        public string Status { get; set; }
        public virtual ICollection<OrderTable> OrderTable { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }

}
