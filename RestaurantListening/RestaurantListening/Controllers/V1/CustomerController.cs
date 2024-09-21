using AutoMapper;
using Marvin.Cache.Headers.Interfaces;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomerController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CustomerController> _logger;
    private readonly IMapper _mapper;


    public CustomerController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, 
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;

    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers([FromQuery] RequestParams requestParams)
    {
        try
        {
            var customers = await _unitOfWork.Customers.GetAll(requestParams);
            var results = _mapper.Map<ICollection<CustomerDTO>>(customers);
            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCustomers)}");
            return StatusCode(500, "Internal Server Error. Please Try Again Later.");
        }
    }

    [HttpGet("{id:int}", Name = "GetCustomer")]
    public async Task<IActionResult> GetCustomer(int id)
    {
        try
        {
            var customer = await _unitOfWork.Customers.Get(q => q.CustomerId == id, new List<string> { "Orders", "Reservations" });
                    
            var result = _mapper.Map<CustomerDTO>(customer);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCustomer)}");
            return StatusCode(500, "Internal Server Error. Please Try Again Later.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomer([FromBody] CreatedCustomerDTO customerDTO)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogError($"Invalid Post attempt in {nameof(CreateCustomer)}");
            return BadRequest(ModelState);
        }

        try
        {
            var customer = _mapper.Map<Customer>(customerDTO);
            await _unitOfWork.Customers.Insert(customer);
            await _unitOfWork.Save();
            return CreatedAtRoute("GetCustomer", new { id = customer.CustomerId }, customer);
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
            _logger.LogError(ex, $"Something Went Wrong in the {nameof(CreateCustomer)}");
            return StatusCode(500, "Internal Server Error. Please Try Again Later.");
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] UpdateCustomerDTO customerDTO)
    {
        if (!ModelState.IsValid || id < 1)
        {
            _logger.LogError($"Invalid Update attempt in {nameof(UpdateCustomer)}");
            return BadRequest(ModelState);
        }

        try
        {
            var customer = await _unitOfWork.Customers.Get(q => q.CustomerId == id);

            if (customer == null)
            {
                _logger.LogError($"Invalid Update attempt in {nameof(UpdateCustomer)}");
                return BadRequest("Submitted data is invalid");
            }

            _mapper.Map(customerDTO, customer);
            _unitOfWork.Customers.Update(customer);
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
            _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateCustomer)}");
            return StatusCode(500, "Internal Server Error. Please Try Again Later.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        if (id < 1)
        {
            _logger.LogError($"Invalid Delete attempt in {nameof(DeleteCustomer)}");
            return BadRequest();
        }

        try
        {
            var customer = await _unitOfWork.Customers.Get(p => p.CustomerId == id);
            if (customer == null)
            {
                _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCustomer)}");
                return BadRequest("Submitted data is invalid");
            }

            await _unitOfWork.Customers.Delete(id);
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
            _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteCustomer)}");
            return StatusCode(500, "Internal Server Error. Please Try Again Later.");
        }
    }
}
