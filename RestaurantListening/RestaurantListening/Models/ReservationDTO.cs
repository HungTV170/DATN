using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantListening.Models
{
    public class CreatedReservationDTO
    {
        [Required]
        public int CustomerId { get; set; }
        [Required]

        public int TableId { get; set; }
        [Required]
        public int NumberOfPeople { get; set; }
        [Required]
        public DateTime ReservationDate { get; set; }
        [Required]
        public TimeSpan ReservationTime { get; set; }

    }
    public class ReservationDTO : CreatedReservationDTO
    {
        public int ReservationId { get; set; }

        public string CustomerName {  get; set; }
        public string CustomerPhone { get; set; }
        public CustomerDTO Customer { get; set; }
        public TableDTO Table { get; set; }
    }
    public class UpdateReservationDTO : CreatedReservationDTO { }   
}
