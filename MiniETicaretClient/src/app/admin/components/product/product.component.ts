import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/products/create-product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {
  constructor(private httpClientService: HttpClientService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.showSpinner();
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: CreateProduct) {
    this.listComponents.getProducts();
  }
}
