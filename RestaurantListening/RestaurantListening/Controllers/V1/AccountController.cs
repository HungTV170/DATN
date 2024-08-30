using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Services;
using System.Security.Claims;
using System.Text;

namespace RestaurantListening.Controllers.V1
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApiUser> _userManager;
        //private readonly SignInManager<ApiUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly ILogger<AccountController> _logger;
        private readonly IAuthManager _authManager;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(UserManager<ApiUser> userManager,
            //SignInManager<ApiUser> signInManager,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger<AccountController> logger,
            IAuthManager authManager)
        {
            _userManager = userManager;
            //_signInManager = signInManager;
            _mapper = mapper;
            _logger = logger;
            _authManager = authManager;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDTO)
        {
            _logger.LogInformation($"Registration Attempt for {userDTO.Email}");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = _mapper.Map<ApiUser>(userDTO);
                user.UserName = userDTO.Email;


                var result = await _userManager.CreateAsync(user, userDTO.Password);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return BadRequest(ModelState);
                }
                await _userManager.AddToRolesAsync(user, userDTO.Roles);

                return Accepted();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(Register)}");
                return Problem($"Something Went Wrong in the {nameof(Register)}", statusCode: 500);
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO userDTO)
        {
            _logger.LogInformation($"Login Attempt for {userDTO.Email}");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!await _authManager.ValidateUser(userDTO))
                {
                    return Unauthorized();
                }
                //await _signInManager.PasswordSignInAsync(userDTO.Email, userDTO.Password,true,false);


                return Accepted(new { Token = await _authManager.CreateToken() });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(Login)}");
                return Problem($"Something Went Wrong in the {nameof(Login)}", statusCode: 500);
            }

        }

        [HttpGet("me")]
        public async Task<IActionResult> GetAccountInfo()
        {
            var find = ClaimTypes.NameIdentifier;
            var userId = User.FindFirstValue(find);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var employee = await _unitOfWork.Employees.Get(e => e.EmployeeId == user.EmployeeId,
                new List<string> { });

            return Ok(employee);
        }
        [HttpPost("ChangePass")]
        public async Task<IActionResult> ChangePassword(ChangePassDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var find = ClaimTypes.NameIdentifier;
                var userId = User.FindFirstValue(find);
                if (userId == null)
                {
                    return Unauthorized();
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }

                var passwordValidationResult = await _userManager.PasswordValidators[0].ValidateAsync(_userManager, user, model.NewPassword);

                if (!passwordValidationResult.Succeeded)
                {
                    foreach (var error in passwordValidationResult.Errors)
                    {
                        ModelState.AddModelError("message", error.Description);
                    }
                    return BadRequest(ModelState);
                }

                var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                if (result.Succeeded)
                {
                    return Ok(new { Message = "Password changed successfully" });
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("message", error.Description);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(ChangePassword)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }

        }

        [HttpPost("ChangeProfile")]
        public async Task<IActionResult> ChangeProfile([FromBody] UpdateEmployeeDTO employeeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var find = ClaimTypes.NameIdentifier;
                var userId = User.FindFirstValue(find);
                if (userId == null)
                {
                    return Unauthorized();
                }
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }

                var Employee = await _unitOfWork.Employees.Get(q => q.EmployeeId == user.EmployeeId);

                if (Employee == null)
                {
                    _logger.LogError($"Invalid Update attempt in {nameof(ChangeProfile)}");
                    return BadRequest("Submitted data is invalid");
                }

                _mapper.Map(employeeDTO, Employee);
                _unitOfWork.Employees.Update(Employee);
                await _unitOfWork.Save();
                return NoContent();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(ChangeProfile)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }
}

