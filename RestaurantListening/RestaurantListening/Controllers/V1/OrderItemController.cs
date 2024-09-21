using AutoMapper;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Data;
using RestaurantListening.Services;
using System.Collections.Generic;
using System.Net.WebSockets;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<OrderItemController> _logger;
        private readonly IMapper _mapper;

        public OrderItemController(IUnitOfWork unitOfWork, 
            ILogger<OrderItemController> logger, 
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;

        }
        [HttpGet]
        public async Task<IActionResult> GetOrderItems([FromQuery] RequestParams requestParams)
        {
            try
            {
                var OrderItems = await _unitOfWork.OrderItems.GetAll(requestParams);
                var results = _mapper.Map<ICollection<OrderItemDTO>>(OrderItems);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetOrderItems)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpGet("{id:int}", Name = "GetOrderItem")]


        public async Task<IActionResult> GetOrderItem(int id)
        {
            try
            {
                var OrderItem = await _unitOfWork.OrderItems.Get(q => q.OrderItemId == id, new List<string> { "Order", "MenuItem" });

                var result = _mapper.Map<OrderItemDTO>(OrderItem);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetOrderItem)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpPost]

        public async Task<IActionResult> CreateOrderItem([FromBody] List<CreatedOrderItemDTO> ListOrderItemDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attampt in {nameof(CreateOrderItem)}");
                return BadRequest(ModelState);
            }

            try
            {
                var ListOrderItem = _mapper.Map<List<OrderItem>>(ListOrderItemDTO);

                foreach (var orderitem in ListOrderItem)
                {
                    await _unitOfWork.OrderItems.Insert(orderitem);
                }
                await _unitOfWork.Save();

                return Ok(_mapper.Map < List < OrderItemDTO >> (ListOrderItem));
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
                _logger.LogError(ex, $"Somethng Went Wrong in the {nameof(CreateOrderItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }



        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateOrderItem(int id, [FromBody] UpdateOrderItemDTO OrderItemDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attampt in {nameof(UpdateOrderItem)}");
                return BadRequest(ModelState);
            }

            try
            {

                var OrderItem = await _unitOfWork.OrderItems.Get(q => q.OrderItemId == id);

                if (OrderItem == null)
                {
                    _logger.LogError($"Invalid Update attampt in {nameof(UpdateOrderItem)}");
                    return BadRequest("Submite data is invalid");
                }

                _mapper.Map(OrderItemDTO, OrderItem);
                _unitOfWork.OrderItems.Update(OrderItem);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateOrderItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }


        [HttpDelete]

        public async Task<IActionResult> DeleteOrderItem([FromBody] List<int> ids)
        {

            try
            {
                foreach(int id in ids)
                {
                    var OrderItem = await _unitOfWork.OrderItems.Get(p => p.OrderItemId == id);
                    if (OrderItem == null)
                    {
                        _logger.LogError($"Invalid DELETE attemp in {nameof(DeleteOrderItem)}");
                        return BadRequest("Submitted data in invalid");
                    }
                    await _unitOfWork.OrderItems.Delete(id);
                }
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteOrderItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }
    }
}
