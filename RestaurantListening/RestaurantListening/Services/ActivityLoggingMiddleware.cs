using Newtonsoft.Json;

namespace RestaurantListening.Services
{
    public class SessionLoggingMiddleware
    {
        private readonly RequestDelegate _next;


        public SessionLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Đặt đường dẫn file log dựa trên ID người dùng tại thời điểm yêu cầu
            string userId = context.User.Identity.IsAuthenticated ? context.User.Identity.Name ?? "Anonymous" : "Anonymous";
            string logFilePath = Path.Combine(Directory.GetCurrentDirectory(), "logs", $"{userId}_session.log");

            // Ví dụ ghi log (bạn có thể thay đổi logic ghi log theo nhu cầu)
            var logEntry = $"Accessed {context.Request.Path} at {DateTime.Now}";
            WriteLogToFile(logFilePath, logEntry);

            await _next(context);
        }

        private static readonly object _fileLock = new object();

        private void WriteLogToFile(string logFilePath, string logEntry)
        {
            lock (_fileLock)
            {
                var directory = Path.GetDirectoryName(logFilePath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                File.AppendAllText(logFilePath, logEntry + Environment.NewLine);
            }
        }

    }

    public class ActivityLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public ActivityLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Ghi lại thông tin hoạt động (ví dụ: URL truy cập)
            if (context.User.Identity.IsAuthenticated)
            {
                var activities = context.Session.GetString("UserActivities");
                var activityList = string.IsNullOrEmpty(activities) ? new List<string>() : JsonConvert.DeserializeObject<List<string>>(activities);

                var logEntry = $"Accessed {context.Request.Path} at {DateTime.Now}";
                activityList.Add(logEntry);
                context.Session.SetString("UserActivities", JsonConvert.SerializeObject(activityList));
            }

            await _next(context);
        }
    }
}
