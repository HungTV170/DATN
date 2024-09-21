using AutoMapper;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Services;

namespace RestaurantListening.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<MenuItemController> _logger;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public MenuItemController(
            IUnitOfWork unitOfWork, 
            ILogger<MenuItemController> logger, 
            IMapper mapper,
            IFileService fileService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _fileService = fileService;
        }
        [HttpGet]
        public async Task<IActionResult> GetMenuItems([FromQuery] RequestParams requestParams)
        {
            try
            {
                var MenuItems = await _unitOfWork.MenuItems.GetAll(requestParams);
                var results = _mapper.Map<ICollection<MenuItemDTO>>(MenuItems);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetMenuItems)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }


        [HttpGet("{id:int}", Name = "GetMenuItem")]
        [Authorize(Roles = "Administrator")]

        public async Task<IActionResult> GetMenuItem(int id)
        {
            try
            {
                var MenuItem = await _unitOfWork.MenuItems.Get(q => q.ItemId == id, new List<string> { "OrderItems"});

                var result = _mapper.Map<MenuItemDTO>(MenuItem);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetMenuItem)}");
                return StatusCode(500, "Internal Servel Error. Please Try Again Later.");
            }
        }

        
        [HttpPost]
        [Authorize(Roles = "Administrator")]

        public async Task<IActionResult> CreateMenuItem([FromForm] CreatedMenuItemDTO MenuItemDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid Post attampt in {nameof(CreateMenuItem)}");
                return BadRequest(ModelState);
            }

            try
            {


                var MenuItem = _mapper.Map<MenuItem>(MenuItemDTO);
                var ItemName = MenuItem.Name.Trim();
                var HasName = await _unitOfWork.MenuItems.Get(c => c.Name.ToLower().Equals(ItemName.ToLower()));
                if (HasName!= null)
                {
                    return BadRequest(new { message = $"Đã tồn tại món ăn {HasName.Name}." });
                }

                if (MenuItemDTO.ImgFile != null)
                {
                    if (MenuItemDTO.ImgFile.Length > 1 * 2024 * 2024)
                    {
                        return BadRequest(new { message = "Dữ liệu đã tồn tại hoặc có lỗi khác khi xóa bản ghi." });
                    }
                    string[] allowedFileExtensions = [".jpg", ".ipeg", ".png"];
                    string createdImgName = await _fileService.SaveFileAsync(
                        MenuItemDTO.ImgFile, allowedFileExtensions);
                    MenuItem.ItemImg = createdImgName;
                }


                await _unitOfWork.MenuItems.Insert(MenuItem);
                await _unitOfWork.Save();

                return CreatedAtRoute("GetMenuItem", new { id = MenuItem.ItemId }, MenuItem);
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
                _logger.LogError(ex, $"Somethng Went Wrong in the {nameof(CreateMenuItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }


        
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrator")]

        public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] UpdateMenuItemDTO MenuItemDTO)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid Update attampt in {nameof(UpdateMenuItem)}");
                return BadRequest(ModelState);
            }

            try
            {

                var MenuItem = await _unitOfWork.MenuItems.Get(q => q.ItemId == id);

                string oldImg = MenuItem.ItemImg;

                if (MenuItem == null)
                {
                    _logger.LogError($"Invalid Update attampt in {nameof(UpdateMenuItem)}");
                    return BadRequest("Submite data is invalid");
                }
                if(MenuItemDTO.ImgFile != null)
                {
                    if (MenuItemDTO.ImgFile.Length > 1 * 2024 * 2024)
                    {
                        return BadRequest(new { message = "Dữ liệu đã tồn tại hoặc có lỗi khác khi xóa bản ghi." });
                    }
                    string[] allowedFileExtensions = [".jpg", ".ipeg", ".png"];
                    string createdImgName = await _fileService.SaveFileAsync(
                        MenuItemDTO.ImgFile, allowedFileExtensions);
                    MenuItemDTO.ItemImg = createdImgName;
                }

                _mapper.Map(MenuItemDTO, MenuItem);
                if (MenuItemDTO.ImgFile != null)
                {
                    MenuItem.ItemImg = MenuItemDTO.ItemImg;
                }
                else
                {
                    MenuItem.ItemImg = oldImg;
                }

                _unitOfWork.MenuItems.Update(MenuItem);
                await _unitOfWork.Save();

                if (MenuItemDTO.ImgFile != null) 
                {
                    _fileService.DeleteFile(oldImg);
                }
                return Ok(MenuItem);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateMenuItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }

        
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid Delete attampt in {nameof(DeleteMenuItem)}");
                return BadRequest();
            }

            try
            {

                var MenuItem = await _unitOfWork.MenuItems.Get(p => p.ItemId == id);
                if(MenuItem.ItemImg != null)
                {
                    _fileService.DeleteFile(MenuItem.ItemImg);
                }

                if (MenuItem == null)
                {
                    _logger.LogError($"Invalid DELETE attemp in {nameof(DeleteMenuItem)}");
                    return BadRequest("Submitted data in invalid");
                }
                await _unitOfWork.MenuItems.Delete(id);
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
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteMenuItem)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later");
            }
        }
    }
}
