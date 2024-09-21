using AutoMapper;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Services;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ReservationController> _logger;
        private readonly IMapper _mapper;
        private readonly ReservationService _reservationService;

        public ReservationController(
            IUnitOfWork unitOfWork, 
            ILogger<ReservationController> logger, 
            IMapper mapper,
            ReservationService reservationService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _reservationService = reservationService;
        }
        [HttpGet]
        public async Task<IActionResult> GetReservations([FromQuery] RequestParams requestParams)
        {
            try
            {
                Func<IQueryable<Reservation>, IOrderedQueryable<Reservation>> orderBy = q => q.OrderBy(p => p.ReservationId);

                var Reservations = await _unitOfWork.Reservations.GetAll(null, orderBy);
                var results = _mapper.Map<ICollection<ReservationDTO>>(Reservations);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetReservations)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }
        [HttpGet("{id:int}", Name = "GetReservation")]

        public async Task<IActionResult> GetReservation(int id)
        {
            try
            {
                var Reservation = await _unitOfWork.Reservations.Get(q => q.ReservationId == id, new List<string> { "Customer", "Table" });

                var result = _mapper.Map<ReservationDTO>(Reservation);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetReservation)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpPost]

        public async Task<IActionResult> CreateReservation([FromBody] CreatedReservationDTO ReservationDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attampt in {nameof(CreateReservation)}");
                return BadRequest(ModelState);
            }
            if (!await _reservationService.CheckNewReservation(ReservationDTO))
            {
                return BadRequest(new { message = "Thời gian đặt bàn bị trùng" });
            }
            try
            {
                var Reservation = _mapper.Map<Reservation>(ReservationDTO);
                await _unitOfWork.Reservations.Insert(Reservation);
                await _unitOfWork.Save();
                var reservationDTO = _mapper.Map<ReservationDTO>(Reservation);
                return CreatedAtRoute("GetReservation", new { id = Reservation.ReservationId }, reservationDTO);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx)
            {
                switch (sqlEx.Number)
                {
                    case 547:
                        return BadRequest(new { message = "Tham chiếu không hợp lệ trong khóa ngoại. Bản ghi liên quan không tồn tại." });
                    case 2627:
                    case 2601:
                        return BadRequest(new { message = "Tham chiếu không hợp lệ trong khóa ngoại. Bản ghi liên quan không tồn tại." });
                    case 235:
                        return BadRequest(new { message = "Tham chiếu không hợp lệ trong khóa ngoại. Bản ghi liên quan không tồn tại." });
                    default:
                        return StatusCode(500, "Lỗi máy chủ. Vui lòng thử lại sau.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Somethng Went Wrong in the {nameof(CreateReservation)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }


        
        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateReservation(int id, [FromBody] UpdateReservationDTO ReservationDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attampt in {nameof(UpdateReservation)}");
                return BadRequest(ModelState);
            }

            try
            {

                var Reservation = await _unitOfWork.Reservations.Get(q => q.ReservationId == id);

                if (Reservation == null)
                {
                    _logger.LogError($"Invalid Update attampt in {nameof(UpdateReservation)}");
                    return BadRequest("Submite data is invalid");
                }

                _mapper.Map(ReservationDTO, Reservation);
                _unitOfWork.Reservations.Update(Reservation);
                await _unitOfWork.Save();

                return NoContent();
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx)
            {
                switch (sqlEx.Number)
                {
                    case 547:
                        return BadRequest(new { message = "Tham chiếu không hợp lệ trong khóa ngoại. Bản ghi liên quan không tồn tại." });
                    case 2627:
                    case 2601:
                        return BadRequest(new { message = "Dữ liệu đã tồn tại hoặc có lỗi khác khi xóa bản ghi." });
                    case 235:
                        return BadRequest(new { message = "Lỗi ràng buộc dữ liệu. Vui lòng kiểm tra dữ liệu." });
                    default:
                        return StatusCode(500, "Lỗi máy chủ. Vui lòng thử lại sau.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateReservation)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }

        
        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attampt in {nameof(DeleteReservation)}");
                return BadRequest();
            }

            try
            {

                var Reservation = await _unitOfWork.Reservations.Get(p => p.ReservationId == id);
                if (Reservation == null)
                {
                    _logger.LogError($"Invalid DELETE attemp in {nameof(DeleteReservation)}");
                    return BadRequest("Submitted data in invalid");
                }
                await _unitOfWork.Reservations.Delete(id);
                await _unitOfWork.Save();


                return NoContent();
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx)
            {
                switch (sqlEx.Number)
                {
                    case 547:
                        return BadRequest(new { message = "Tham chiếu không hợp lệ trong khóa ngoại. Bản ghi liên quan không tồn tại." });
                    case 2627:
                    case 2601:
                        return BadRequest(new { message = "Dữ liệu đã tồn tại hoặc có lỗi khác khi xóa bản ghi." });
                    case 235:
                        return BadRequest(new { message = "Lỗi ràng buộc dữ liệu. Vui lòng kiểm tra dữ liệu." });
                    default:
                        return StatusCode(500, "Lỗi máy chủ. Vui lòng thử lại sau.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteReservation)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }
    }
}
