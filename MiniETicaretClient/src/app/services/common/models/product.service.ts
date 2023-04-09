import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Pagination } from 'src/app/contracts/pagination';
import { CreateProduct } from 'src/app/contracts/products/create-product';
import { ListProduct } from 'src/app/contracts/products/list-product';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { Controllers } from '../constants/controllers';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  // create(product: CreateProduct, successCallBack?: any, errorCallBack?: any) {
  //   this.toastrService.messageInfo("İşleme Alındı");
  //   this.httpClientService.post({
  //     controller: Controllers.Products
  //   }, product).subscribe(result => {
  //     successCallBack();
  //   }, (errorResponse: HttpErrorResponse) => {
  //     const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
  //     let message = "";
  //     _error.forEach((v, index) => {
  //       v.value.forEach((_v, _index) => {
  //         message += `${_v}<br>`;
  //       });
  //     });
  //     errorCallBack(message);
  //   });
  // }

  create(product: CreateProduct, successCallBack: any, errorCallBack: any) {
    this.toastrService.messageInfo("İşleme Alındı");
    this.httpClientService.post({
      controller: Controllers.Products
    }, product)
      .subscribe({
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        },
        complete: () => {
          successCallBack();
        }
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack: () => any, errorCallBack: (errorMessage: string) => any): Promise<Pagination<ListProduct>> {
    const promiseData: Pagination<ListProduct> = await firstValueFrom(this.httpClientService.get<Pagination<ListProduct>>({
      controller: Controllers.Products,
      queryString: `page=${page}&size=${size}`
    }))
      .then()
      // .then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return promiseData;
  }
}
