using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "Administrator")]
    public class EmployeeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMapper _mapper;


        public EmployeeController(IUnitOfWork unitOfWork, ILogger<EmployeeController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery] RequestParams requestParams)
        {
            try
            {
                var Employees = await _unitOfWork.Employees.GetAll(requestParams);
                var results = _mapper.Map<ICollection<EmployeeDTO>>(Employees);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetEmployees)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{id:int}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            try
            {
                var Employee = await _unitOfWork.Employees.Get(q => q.EmployeeId == id, new List<string> { "Orders"});

                var result = _mapper.Map<EmployeeDTO>(Employee);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetEmployee)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreatedEmployeeDTO EmployeeDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attempt in {nameof(CreateEmployee)}");
                return BadRequest(ModelState);
            }

            try
            {
                var Employee = _mapper.Map<Employee>(EmployeeDTO);
                await _unitOfWork.Employees.Insert(Employee);
                await _unitOfWork.Save();
                return CreatedAtRoute("GetEmployee", new { id = Employee.EmployeeId }, Employee);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(CreateEmployee)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] UpdateEmployeeDTO EmployeeDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attempt in {nameof(UpdateEmployee)}");
                return BadRequest(ModelState);
            }

            try
            {
                var Employee = await _unitOfWork.Employees.Get(q => q.EmployeeId == id);

                if (Employee == null)
                {
                    _logger.LogError($"Invalid Update attempt in {nameof(UpdateEmployee)}");
                    return BadRequest("Submitted data is invalid");
                }

                _mapper.Map(EmployeeDTO, Employee);
                _unitOfWork.Employees.Update(Employee);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateEmployee)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attempt in {nameof(DeleteEmployee)}");
                return BadRequest();
            }

            try
            {
                var Employee = await _unitOfWork.Employees.Get(p => p.EmployeeId == id);
                if (Employee == null)
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteEmployee)}");
                    return BadRequest("Submitted data is invalid");
                }

                await _unitOfWork.Employees.Delete(id);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteEmployee)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }
}
