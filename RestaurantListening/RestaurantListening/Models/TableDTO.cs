using RestaurantListening.Data;
using System.ComponentModel.DataAnnotations;

namespace RestaurantListening.Models
{
    public class CreatedTableDTO
    {
        [Required]
        public int TableNumber { get; set; }
        [Required]
        public int Seats { get; set; }
        [Required]
        public string Status { get; set; }

    }
    public class TableDTO : CreatedTableDTO
    {
        public int TableId { get; set; }

        public ICollection<OrderTableDTO> OrderTables { get; set; }
        public ICollection<ReservationDTO> Reservations { get; set; }
    }

    public class UpdateTableDTO : CreatedTableDTO { }
}
