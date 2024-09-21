using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<PaymentController> _logger;
        private readonly IMapper _mapper;


        public PaymentController(IUnitOfWork unitOfWork, ILogger<PaymentController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetPayments([FromQuery] RequestParams requestParams)
        {
            try
            {
                var Payments = await _unitOfWork.Payments.GetAll(requestParams);
                var results = _mapper.Map<ICollection<PaymentDTO>>(Payments);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetPayments)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{id:int}", Name = "GetPayment")]
        public async Task<IActionResult> GetPayment(int id)
        {
            try
            {
                var Payment = await _unitOfWork.Payments.Get(q => q.PaymentId == id, new List<string> { "Order" });

                var result = _mapper.Map<PaymentDTO>(Payment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetPayment)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] CreatedPaymentDTO PaymentDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attempt in {nameof(CreatePayment)}");
                return BadRequest(ModelState);
            }

            try
            {
                var Payment = _mapper.Map<Payment>(PaymentDTO);
                var orderId = Payment.OrderId;
                var Order = await _unitOfWork.Orders.Get(q => q.OrderId == orderId);
                Order.StatusId = OrderStatus.Completed;
                _unitOfWork.Orders.Update(Order);



                await _unitOfWork.Payments.Insert(Payment);
                await _unitOfWork.Save();
                return CreatedAtRoute("GetPayment", new { id = Payment.PaymentId }, Payment);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(CreatePayment)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] UpdatePaymentDTO PaymentDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attempt in {nameof(UpdatePayment)}");
                return BadRequest(ModelState);
            }

            try
            {
                var Payment = await _unitOfWork.Payments.Get(q => q.PaymentId == id);

                if (Payment == null)
                {
                    _logger.LogError($"Invalid Update attempt in {nameof(UpdatePayment)}");
                    return BadRequest("Submitted data is invalid");
                }

                _mapper.Map(PaymentDTO, Payment);
                _unitOfWork.Payments.Update(Payment);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdatePayment)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attempt in {nameof(DeletePayment)}");
                return BadRequest();
            }

            try
            {
                var Payment = await _unitOfWork.Payments.Get(p => p.PaymentId == id);
                if (Payment == null)
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeletePayment)}");
                    return BadRequest("Submitted data is invalid");
                }

                await _unitOfWork.Payments.Delete(id);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeletePayment)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }
}
