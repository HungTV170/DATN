using AutoMapper;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Services;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<TableController> _logger;
        private readonly IMapper _mapper;
        private readonly ReservationService _reservationService;

        public TableController(
            IUnitOfWork unitOfWork, 
            ILogger<TableController> logger, 
            IMapper mapper,
            ReservationService reservationService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _reservationService = reservationService;
        }
        [HttpGet("index")]
        public async Task<IActionResult> Index([FromQuery] DateTime date) {
            return Ok(await _reservationService.GetAllTimeInterval(date));
        }
        [HttpGet]
        public async Task<IActionResult> GetTables([FromQuery] RequestParams? requestParams)
        {
            try
            {
                var Tables = await _unitOfWork.Tables.GetAll(requestParams);
                var results = _mapper.Map<ICollection<TableDTO>>(Tables);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetTables)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpGet("{id:int}", Name = "GetTable")]


        public async Task<IActionResult> GetTable(int id, [FromQuery] DateTime? date)
        {

            try
            {
                if (date != null)
                {
                    DateTime Date = date ?? DateTime.Now;
                    return Ok(await _reservationService.GetTimeInterval(id, Date));
                }
                var Table = await _unitOfWork.Tables.Get(q => q.TableId == id, new List<string> { /*"Orders", "Reservations" */});

                var result = _mapper.Map<TableDTO>(Table);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetTable)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpPost]

        public async Task<IActionResult> CreateTable([FromBody] CreatedTableDTO TableDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attampt in {nameof(CreateTable)}");
                return BadRequest(ModelState);
            }

            try
            {
                var table = _mapper.Map<Table>(TableDTO);
                await _unitOfWork.Tables.Insert(table);
                await _unitOfWork.Save();

                return CreatedAtRoute("GetTable", new { id = table.TableId }, table);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Somethng Went Wrong in the {nameof(CreateTable)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }



        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateTable(int id, [FromBody] UpdateTableDTO TableDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attampt in {nameof(UpdateTable)}");
                return BadRequest(ModelState);
            }

            try
            {

                var Table = await _unitOfWork.Tables.Get(q => q.TableId == id);

                if (Table == null)
                {
                    _logger.LogError($"Invalid Update attampt in {nameof(UpdateTable)}");
                    return BadRequest("Submite data is invalid");
                }

                _mapper.Map(TableDTO, Table);
                _unitOfWork.Tables.Update(Table);
                await _unitOfWork.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateTable)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }


        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteTable(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attampt in {nameof(DeleteTable)}");
                return BadRequest();
            }

            try
            {

                var Table = await _unitOfWork.Tables.Get(p => p.TableId == id);
                if (Table == null)
                {
                    _logger.LogError($"Invalid DELETE attemp in {nameof(DeleteTable)}");
                    return BadRequest("Submitted data in invalid");
                }
                await _unitOfWork.Tables.Delete(id);
                await _unitOfWork.Save();


                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteTable)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }
    }
}
