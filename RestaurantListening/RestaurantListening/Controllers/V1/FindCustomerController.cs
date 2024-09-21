using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.IRepository;
using RestaurantListening.Models;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class FindCustomerController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<FindCustomerController> _logger;
        private readonly IMapper _mapper;

        public FindCustomerController(IUnitOfWork unitOfWork, ILogger<FindCustomerController> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{query}")]
        public async Task<IActionResult> GetCustomer(string query)
        {
            try
            {
    
                query = query.Trim();


                var names = query.Split(' ', 2); 
                var firstName = names[0];
                var lastName = names.Length > 1 ? names[1] : string.Empty;

 
                var customer = await _unitOfWork.Customers.Get(
                    c => c.FirstName.ToLower() == firstName.ToLower() &&
                         c.LastName.ToLower() == lastName.ToLower(),
                    new List<string> { "Orders", "Reservations" }
                );

                if (customer == null)
                {
                    return BadRequest(new { message = "Không tìm thấy khách hàng" });
                }

                var result = _mapper.Map<CustomerDTO>(customer);
                var today = DateTime.Now.Date;
                result.Reservations = result.Reservations
                    .Where(time => time.ReservationDate.Date == today).ToList();

                return Ok(new {
                    Id= customer.CustomerId,
                    FirstName= result.FirstName,
                    LastName= result.LastName,
                    Reservations = result.Reservations
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Có lỗi xảy ra trong {nameof(GetCustomer)}");
                return StatusCode(500, "Lỗi máy chủ. Vui lòng thử lại sau.");
            }
        }

    }
}
