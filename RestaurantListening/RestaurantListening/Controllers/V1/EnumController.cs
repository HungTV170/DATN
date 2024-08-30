using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Repository;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnumController(IUnitOfWork _unitOfWork,
        ILogger<EnumController> _logger) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetOrderStatus()
        {
            try
            {
                var results = await _unitOfWork.OrderStatusTypes.GetAll();
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetOrderStatus)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }
    }
}
