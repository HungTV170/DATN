using Marvin.Cache.Headers.Interfaces;
using Marvin.Cache.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RestaurantListening;
using RestaurantListening.Configurations;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Repository;
using RestaurantListening.Services;
using RestaurantListening.Data.SqlFileData;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

//..add auto mapper
builder.Services.AddAutoMapper(typeof(MapperInitilizer));
//..add unit of work , AuthManager
builder.Services.AddIdentity<ApiUser, IdentityRole>();
builder.Services.AddDistributedMemoryCache(); // Cần thiết cho lưu trữ Session trong bộ nhớ
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Thay đổi theo nhu cầu
    options.Cookie.HttpOnly = true; // Giới hạn quyền truy cập cookie từ JavaScript
    options.Cookie.IsEssential = true; // Cookie cần thiết cho ứng dụng
});

builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ReservationService>();

//...connect Database
builder.Services.AddDbContext<RestaurantDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("RestaurantString")));


//... add identity
builder.Services.AddAuthentication();
builder.Services.ConfigureIdentity();
//... add jwt
builder.Services.ConfigureJWT(builder.Configuration);

//...add  CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});



// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(opt =>
        opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//... api version
builder.Services.ConfigureVersioning();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});


var app = builder.Build();

app.Use(async (context, next) =>
{

    if (context.Request.Path.StartsWithSegments("/uploads"))
    {
        var decodedPath = Uri.UnescapeDataString(context.Request.Path);
        var filePath = Path.Combine("wwwroot", decodedPath.TrimStart('/'));

        if (!System.IO.File.Exists(filePath))
        {
            context.Response.ContentType = "image/jpeg";
            await context.Response.SendFileAsync(Path.Combine("wwwroot", "images", "NoIMG.jpg"));
            return; 
        }
    }


    await next();
});

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<RestaurantDbContext>();

        if (!context.Database.CanConnect())
        {
            Console.WriteLine("Database does not exist, creating and updating...");
            context.Database.Migrate();
        }
        else
        {
            Console.WriteLine("Database already exists.");
        }

        Console.WriteLine("Seed Data ....");
        DbInitializer.Initialize(builder.Configuration, builder.Environment);

        var userManager = services.GetRequiredService<UserManager<ApiUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        await DbInitializer.SeedRolesAndUsersAsync(userManager, roleManager);

    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.UseStaticFiles();
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.UseSession();
app.UseMiddleware<ActivityLoggingMiddleware>();
app.UseMiddleware<SessionLoggingMiddleware>();

app.MapControllers();

app.Run();
