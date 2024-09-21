//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using RestaurantListening.Data;
//using System.Linq;
//using System.Threading.Tasks;

//[ApiController]
//[Route("api/[controller]")]
//public class OrderTableController : ControllerBase
//{
//    private readonly RestaurantDbContext _context;

//    public OrderTableController(RestaurantDbContext context)
//    {
//        _context = context;
//    }

//    [HttpPost("update-orders/{id}")]
//    public async Task<IActionResult> UpdateOrders(int id, [FromBody] int[] newOrders)
//    {
//        // Kiểm tra dữ liệu đầu vào
//        if (newOrders == null || !newOrders.Any())
//        {
//            return BadRequest("No new orders provided.");
//        }

//        // Bước 1: Xóa tất cả các bản ghi có OrderId = id
//        var ordersToDelete = await _context.orderTables
//                                           .Where(o => o.OrderId == id)
//                                           .ToListAsync();

//        if (ordersToDelete.Any())
//        {
//            _context.orderTables.RemoveRange(ordersToDelete);
//            await _context.SaveChangesAsync();
//        }

//        // Bước 2: Thêm các bản ghi mới
//        var newOrderTables = newOrders.Select(orderId => new OrderTable
//        {
//            OrderId = id,
//            TableId = orderId
//        }).ToList();

//        _context.orderTables.AddRange(newOrderTables);

//        await _context.SaveChangesAsync();

//        return Ok("Orders updated successfully.");
//    }
//}
