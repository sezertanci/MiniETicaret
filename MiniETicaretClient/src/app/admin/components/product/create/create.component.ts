import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/products/create-product';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(private productService: ProductService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "products",
    action: "fileUpload",
    explanation: "Ürün görseli ekleyin.",
    accept: ".png, .jpg, .jpeg"
  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner();
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.price = parseFloat(price.value);
    createProduct.stock = parseInt(stock.value);

    name.value = "";
    price.value = "0";
    stock.value = "0";

    this.productService.create(createProduct, () => {
      this.hideSpinner();
      this.toastrService.success("Kayıt Başarılı", "İşlem Tamamlandı");

      this.createdProduct.emit(createProduct);
    }, (errorMessage: string) => {
      this.toastrService.error(errorMessage, "İşlem Başarısız");
    });
  }
}
