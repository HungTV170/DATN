using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using System;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<OrderController> _logger;
        private readonly IMapper _mapper;


        public OrderController(IUnitOfWork unitOfWork, ILogger<OrderController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] RequestParams requestParams)
        {
            try
            {

                var Orders = await _unitOfWork.Orders.GetAll(requestParams,new List<string> { "OrderTables" });
                var results = _mapper.Map<ICollection<OrderDTO>>(Orders);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetOrders)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{id:int}", Name = "GetOrder")]
        public async Task<IActionResult> GetOrder(int id)
        {
            try
            {
                var order = await _unitOfWork.Orders.Get(q => q.OrderId == id, new List<string> { "Customer", "Employee", "OrderItems", "Payment" , "Status" ,"OrderTables"});
                //order.OrderItems = await _unitOfWork.OrderItems.
                var result = _mapper.Map<OrderDTO>(order);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetOrder)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreatedOrderDTO OrderDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attempt in {nameof(CreateOrder)}");
                return BadRequest(ModelState);
            }
            try
            {
                var Order = _mapper.Map<Order>(OrderDTO);
                await _unitOfWork.Orders.Insert(Order);
                await _unitOfWork.Save();

                return CreatedAtRoute("GetOrder", new { id = Order.OrderId }, _mapper.Map < OrderDTO > (Order));
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(CreateOrder)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost("Full")]
        public async Task<IActionResult> CreateFullOrder([FromBody] CreatedFullOrderDTO OrderDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attempt in {nameof(CreateFullOrder)}");
                return BadRequest(ModelState);
            }

            await using var transaction = await _unitOfWork.BeginTransactionAsync();
            try
            {
                var Order = _mapper.Map<Order>(OrderDTO.order);
                await _unitOfWork.Orders.Insert(Order);
                await _unitOfWork.Save();

                if(OrderDTO.orderItems.Any())
                {
                    var OrderItems = _mapper.Map<List<OrderItem>>(OrderDTO.orderItems);
                    foreach (var item in OrderItems)
                    {
                        item.OrderId = Order.OrderId;
                        await _unitOfWork.OrderItems.Insert(item);
                    }
                }

                if(OrderDTO.orderTables.Any())
                {
                    var OrderTables = _mapper.Map<List<OrderTable>>(OrderDTO.orderTables);
                    foreach (var table in OrderTables)
                    {
                        table.OrderId = Order.OrderId;
                        await _unitOfWork.OrderTables.Insert(table);
                    }
                }


                await _unitOfWork.Save();

                await transaction.CommitAsync(); 

                return CreatedAtRoute("GetOrder", new { id = Order.OrderId }, _mapper.Map<OrderDTO>(Order));
            }
            catch (DbUpdateException dbEx)
            {
                if (transaction.GetDbTransaction().Connection != null)
                {
                    await transaction.RollbackAsync(); 
                }
                _logger.LogError(dbEx, $"Database update failed in {nameof(CreateFullOrder)}");
                return StatusCode(500, "Database error occurred. Please try again.");
            }
            catch (Exception ex)
            {
                if (transaction.GetDbTransaction().Connection != null)
                {
                    await transaction.RollbackAsync(); // Rollback nếu có lỗi xảy ra và transaction vẫn còn hợp lệ
                }
                _logger.LogError(ex, $"Something went wrong in {nameof(CreateFullOrder)}");
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderDTO OrderDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attempt in {nameof(UpdateOrder)}");
                return BadRequest(ModelState);
            }


            try
            {
                var Order = await _unitOfWork.Orders.Get(q => q.OrderId == id);

                if (Order == null)
                {
                    _logger.LogError($"Invalid Update attempt in {nameof(UpdateOrder)}");
                    return BadRequest("Submitted data is invalid");
                }

                _mapper.Map(OrderDTO, Order);
                _unitOfWork.Orders.Update(Order);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateOrder)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attempt in {nameof(DeleteOrder)}");
                return BadRequest();
            }

            try
            {
                var Order = await _unitOfWork.Orders.Get(p => p.OrderId == id);
                if (Order == null)
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteOrder)}");
                    return BadRequest("Submitted data is invalid");
                }

                await _unitOfWork.Orders.Delete(id);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteOrder)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }

}
