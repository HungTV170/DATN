using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Data;
using RestaurantListening.Models;

namespace RestaurantListening.Controllers.V2
{
    [ApiVersion("2.0")]
    [ApiVersion("3.0")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController(RestaurantDbContext dbContext) : ControllerBase
    {
        [HttpGet("{id:int}", Name = "GetEmployee")]

        public async Task<IActionResult> GetEmployee(int id)
        {
            try
            {
                var result = await dbContext.employees.Include(b => b.Orders).FirstOrDefaultAsync(q => q.EmployeeId == id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }
    }
}
