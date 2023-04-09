import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Pagination } from 'src/app/contracts/pagination';
import { ListProduct } from 'src/app/contracts/products/list-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'actions'];

  dataSource: MatTableDataSource<ListProduct>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner();
    const allProducts: Pagination<ListProduct> = await this.productService
      .read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(), errorMessage => {
          this.toastrService.error(errorMessage, "Hata");
          this.hideSpinner();
        });
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.Items);
    this.paginator.length = allProducts.TotalRow;
    this.hideSpinner();
  }

  async pageChanged() {
    await this.getProducts();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}