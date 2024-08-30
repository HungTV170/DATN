using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;


namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController(RestaurantDbContext _dbContext, ILogger<CustomerController> _logger) : ControllerBase
    {

        [HttpGet("GetRevenue")]
        public async Task<IActionResult> GetRevenue()
        {
            var today = DateTime.Today;

            var payments = await _dbContext.payments
                .Where(p => p.PaymentDate.Date == today)
                .ToListAsync();

            var totalRevenue = payments.Aggregate(0m, (acc, next) => acc + next.Amount);

            return Ok(totalRevenue);
        }

        [HttpGet("GetCustomers")]
        public async Task<IActionResult> GetCustomers()
        {
            var today = DateTime.Today;

            var counts = await _dbContext.orders
                .Where(p => p.OrderDate.Date == today)
                .CountAsync();

            return Ok(counts);
        }

        [HttpGet("GetItems")]
        public async Task<IActionResult> GetItems()
        {
            var today = DateTime.Today;

            var totalItem = _dbContext.orderItems 
                .Join(_dbContext.orders,
                    orderItem => orderItem.OrderId,
                    order => order.OrderId,
                    (orderItem, order) => new { orderItem, order })
                .Where(x => x.order.OrderDate.Date == today)
                .Sum(x => x.orderItem.Quantity);

            return Ok(totalItem);
        }

        [HttpGet("GetTableData")]
        public async Task<IActionResult> GetTableData()
        {
            var tableData = new ChartData();
            DateTime startTime = DateTime.Today.AddHours(7); 
            DateTime endTime = DateTime.Now; 


            TimeSpan totalDuration = endTime - startTime;

            TimeSpan interval = TimeSpan.FromTicks(totalDuration.Ticks / 6);

            var  timeIntervals = Enumerable.Range(0, 6)
                .Select(i => startTime.AddTicks(interval.Ticks * i))
                .ToList();
            // labels
            tableData.labels = timeIntervals
                .Select(time => $"{time.ToString("HH:mm")}-{time.Add(interval).ToString("HH:mm")}")
                .ToList();

            tableData.datasets = new List<DashboardData>();

            // orders
            var orderCounts = timeIntervals.Select(intervals =>(float) _dbContext.orders.Count(o => o.OrderDate >= intervals && o.OrderDate < intervals.Add(interval))
            )
            .ToList();
            var orderData = new DashboardData();
            orderData.label = "orders";
            orderData.data = orderCounts;
            tableData.datasets.Add(orderData);
            //revenue
            var revenueCounts = timeIntervals.Select(intervals =>(float)
            _dbContext.payments
                .Join(_dbContext.orders,
                    payment  => payment.OrderId,
                    order => order.OrderId,
                    (payment, order) => new { payment, order })
                .Where(o => o.order.OrderDate >= intervals && o.order.OrderDate < intervals.Add(interval))
                .Sum(x => x.payment.Amount)
            ).ToList();
            var revenueData = new DashboardData();
            revenueData.label = "revenue";
            revenueData.data = revenueCounts;
            tableData.datasets.Add(revenueData);
            return Ok(tableData);
        }



    }
}
