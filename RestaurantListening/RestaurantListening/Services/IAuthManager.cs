using RestaurantListening.Data;
using RestaurantListening.Models;
using System.Security.Claims;

namespace RestaurantListening.Services
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginUserDTO userDTO);

        Task<string> CreateToken();

    }
}
