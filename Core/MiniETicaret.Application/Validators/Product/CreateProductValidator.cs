using FluentValidation;
using MiniETicaret.Application.DTOs.Product;

namespace MiniETicaret.Application.Validators.Product
{
    public class CreateProductValidator : AbstractValidator<CreateProductDto>
    {
        public CreateProductValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty().WithMessage("Ürün ismi boş geçilemez!")
                .MaximumLength(200).MinimumLength(2).WithMessage("Ürün ismi min:2 max:200 karakter uzunluğunda olmalıdır!");

            RuleFor(x => x.Stock).NotNull().NotEmpty().WithMessage("Stok bilgisi boş geçilemez!")
                .Must(x => x >= 0).WithMessage("Stok bilgisi negatif olamaz!");

            RuleFor(x => x.Price).NotNull().NotEmpty().WithMessage("Fiyat bilgisi boş geçilemez!")
                .Must(x => x >= 0).WithMessage("Fiyat bilgisi negatif olamaz!");
        }
    }
}
