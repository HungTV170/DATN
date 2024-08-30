using RestaurantListening.Controllers.V1;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RestaurantListening.Services
{
    public class TimeInterval
    {
        public DateTime StartTime { get; set; }
        public TimeSpan Duration { get; set; }

        public DateTime EndTime => StartTime.Add(Duration);
    }

    public class ReservationService(IUnitOfWork _unitOfWork,
        ILogger<ReservationController> _logger)
    {
        public async Task<bool> CheckNewReservation(CreatedReservationDTO ReservationDTO)
        {
            int tableId = ReservationDTO.TableId; 
            int number = ReservationDTO.NumberOfPeople;
            var table = await _unitOfWork.Tables.Get(q => q.TableId == tableId,new List<string> {  "Reservations" });
            if(number > table.Seats)
            {
                return false;
            }
            TimeInterval newReservation = new TimeInterval { 
                StartTime = ReservationDTO.ReservationDate,
                Duration = ReservationDTO.ReservationTime};

            List<TimeInterval> reservation = table.Reservations
                .Where(o => o.ReservationDate >= ReservationDTO.ReservationDate.Date && o.ReservationDate < ReservationDTO.ReservationDate.Date.AddDays(1))
                .OrderBy(i => i.ReservationDate)
                .Select(r =>new TimeInterval { StartTime=r.ReservationDate, Duration = r.ReservationTime})
                .ToList();
            reservation.Insert(0, new TimeInterval { StartTime = ReservationDTO.ReservationDate.Date, Duration = TimeSpan.Zero });
            reservation.Add(new TimeInterval { StartTime = ReservationDTO.ReservationDate.Date.AddDays(1).AddTicks(-1), Duration = TimeSpan.Zero });

            for (int i = 0; i < reservation.Count - 1; i++)
            {
                var currentEndTime = reservation[i].EndTime;
                var nextStartTime = reservation[i + 1].StartTime;

                if (currentEndTime <= newReservation.StartTime && newReservation.EndTime <= nextStartTime)
                {
                    return true;
                }
            }

            return false;


        }
        public async Task<List<TimeInterval>> GetTimeInterval(int id,DateTime date)
        {
            DateTime day = date.Date;
            var table = await _unitOfWork.Tables.Get(q => q.TableId == id, new List<string> { "Reservations" });

            List<TimeInterval> reservation = table.Reservations
                .Where(o => o.ReservationDate >= day && o.ReservationDate < day.AddDays(1))
                .OrderBy(i => i.ReservationDate)
                .Select(r => new TimeInterval { StartTime = r.ReservationDate, Duration = r.ReservationTime })
                .ToList();

            reservation.Insert(0,new TimeInterval { StartTime=date,Duration= TimeSpan.Zero });
            reservation.Add(new TimeInterval { StartTime = date.Date.AddDays(1).AddTicks(-1), Duration = TimeSpan.Zero });
            var gaps = new List<TimeInterval>();

            for (int i = 0; i < reservation.Count - 1; i++)
            {
                var currentEndTime = reservation[i].EndTime;
                var nextStartTime = reservation[i + 1].StartTime;

                if (currentEndTime < nextStartTime)
                {
                    gaps.Add(new TimeInterval
                    {
                        StartTime = currentEndTime,
                        Duration = nextStartTime - currentEndTime
                    });
                }
            }

            return gaps;
        }
        public async Task<List<List<TimeInterval>>> GetAllTimeInterval(DateTime date)
        {
            List<List<TimeInterval>> result = new List<List<TimeInterval>>();
            DateTime day = date.Date;
            var items = await _unitOfWork.Tables.GetAll();
            foreach (var item in items)
            {
                int id = item.TableId;
                var timeInterval = await GetTimeInterval(id, day);
                result.Add(timeInterval);
            }

            return result;
        }
    }
}
