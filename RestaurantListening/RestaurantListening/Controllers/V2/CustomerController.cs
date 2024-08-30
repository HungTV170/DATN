using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;

namespace RestaurantListening.Controllers.V2
{
    [ApiVersion("2.0")]
    [ApiVersion("3.0")]
    [ApiController]
    [Route("api/[controller]")]

    public class CustomerController : ControllerBase
    {
        // This action is available in version 3.0
        [HttpGet]
        [MapToApiVersion("2.0")]
        public IActionResult GetV3()
        {
            return Ok("This is version 2.0");
        }

        // This action is available in version 4.0
        [HttpGet]
        [MapToApiVersion("3.0")]
        public IActionResult GetV4()
        {
            return Ok("This is version 3.0");
        }

        // This action is available in both versions 3.0 and 4.0
        [HttpGet("common")]
        public IActionResult GetCommon()
        {
            return Ok("This is available in both version 3.0 and 2.0");
        }
    }
}
