namespace RestaurantListening.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile imageFIle, string[] allowedFileExtensions);
        void DeleteFile(string fileNameWithExtension);
    }
    public class FileService(IWebHostEnvironment environment) : IFileService
    {
        public void DeleteFile(string fileNameWithExtension)
        {
            if (string.IsNullOrEmpty(fileNameWithExtension)) 
            { 
                throw new ArgumentNullException(nameof(fileNameWithExtension));
            }

            var contentPath = environment.ContentRootPath;
            var path = Path.Combine(contentPath, "wwwroot/Uploads", fileNameWithExtension);
            if (File.Exists(path)) 
            {
                File.Delete(path);

            }





        }

        public async Task<string> SaveFileAsync(IFormFile imageFIle, string[] allowedFileExtensions)
        {
            if(imageFIle == null) throw new ArgumentNullException(nameof(imageFIle));

            var contentPath = environment.ContentRootPath;
            var path = Path.Combine(contentPath, "wwwroot/Uploads");

            if (!Directory.Exists(path)) 
            { 
                Directory.CreateDirectory(path);
            }

            var ext = Path.GetExtension(imageFIle.FileName);
            if (!allowedFileExtensions.Contains(ext))
            {
                throw new ArgumentException($"Only  {string.Join(","
                    , allowedFileExtensions)} are allowed");
            }

            var fileName = $"{Guid.NewGuid().ToString()} {ext}";
            var fileNameWithPath = Path.Combine(path, fileName);
            using (var stream = new FileStream(fileNameWithPath,FileMode.Create))
            {
                await imageFIle.CopyToAsync(stream);
            }
            return fileName;
        }
    }
}
