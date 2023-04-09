using Microsoft.AspNetCore.Mvc;
using MiniETicaret.Application.DTOs;
using MiniETicaret.Application.DTOs.Product;
using MiniETicaret.Application.IRepositories.IProduct;
using MiniETicaret.Application.RequestModels;
using MiniETicaret.Domain.Entities;
using System.IO;

namespace MiniETicaret.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductCommandRepository _productCommand;
        private readonly IProductQueryRepository _productQuery;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(IProductCommandRepository productCommand, IProductQueryRepository productQuery, IWebHostEnvironment webHostEnvironment)
        {
            _productCommand = productCommand;
            _productQuery = productQuery;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Pagination pagination)
        {
            PaginationView<Product> result = await _productQuery.GetListWithPaging(pagination, false);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto product)
        {
            var newProduct = new Product
            {
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
            };
            var result = await _productCommand.AddAsync(newProduct);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _productCommand.DeleteAsync(id);

            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> FileUpload()
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "resource/product-images");

            if(!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            Random random = new();

            foreach(IFormFile file in Request.Form.Files)
            {
                string fullPath = Path.Combine(uploadPath, $"{random.NextDouble().ToString().Replace(",", "")}{Path.GetExtension(file.Name)}");

                using FileStream fileStream = new(fullPath, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);

                await file.CopyToAsync(fileStream);

                await fileStream.FlushAsync();
            }

            return Ok();
        }
    }
}
