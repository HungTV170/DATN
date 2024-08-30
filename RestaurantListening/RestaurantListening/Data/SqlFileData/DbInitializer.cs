using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace RestaurantListening.Data.SqlFileData
{
    public static class DbInitializer
    {
        public static void Initialize(IConfiguration configuration, IWebHostEnvironment environment)
        {
            string folderPath = Path.Combine(environment.ContentRootPath, "Data/SqlFileData");

            string connectionString = configuration.GetConnectionString("RestaurantString");


            try
            {
                // Mở kết nối đến cơ sở dữ liệu
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    // Lấy danh sách tất cả các tệp SQL trong thư mục
                    string[] sqlFiles = Directory.GetFiles(folderPath, "*.sql");

                    foreach (string filePath in sqlFiles)
                    {
                        try
                        {
                            // Đọc nội dung của tệp SQL
                            string sqlQuery = File.ReadAllText(filePath);

                            // Tạo đối tượng SqlCommand để thực thi lệnh SQL
                            using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
                            {
                                // Thực thi lệnh SQL
                                cmd.ExecuteNonQuery();
                                Console.WriteLine($"Executed {Path.GetFileName(filePath)} successfully.");
                            }
                        }
                        catch (Exception ex)
                        {
                            // Xử lý lỗi cho từng tệp SQL
                            Console.WriteLine($"An error occurred while executing {Path.GetFileName(filePath)}: {ex.Message}");
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                Console.WriteLine("An error occurred: " + ex.Message);
            }
        }


        public static async Task SeedRolesAndUsersAsync(UserManager<ApiUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            if (!await roleManager.RoleExistsAsync("Administrator"))
            {
                await roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            var existingUser = await userManager.Users.FirstOrDefaultAsync(c => c.EmployeeId == 1);
            if (existingUser != null)
            {
                await userManager.DeleteAsync(existingUser);
            }

            var user = new ApiUser
            {
                UserName = "user@example.com",
                Email = "user@example.com",
                EmployeeId = 1,
                EmailConfirmed = true
            };

            await userManager.CreateAsync(user, "User@123"); 
            await userManager.AddToRoleAsync(user, "User");

            var existingAdmin = await userManager.Users.FirstOrDefaultAsync(c => c.EmployeeId == 2);
            if (existingAdmin != null)
            {
                await userManager.DeleteAsync(existingAdmin);
            }


            var admin = new ApiUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmployeeId = 2,
                EmailConfirmed = true
            };

            await userManager.CreateAsync(admin, "Admin@123"); 
            await userManager.AddToRoleAsync(admin, "Administrator");
        }

    }
}
