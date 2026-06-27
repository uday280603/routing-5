import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']

})
export class ProductDashboardComponent implements OnInit {
  getAllProduct!: Iproduct[];

constructor(   private _productService : ProductService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._productService.fetchAll().subscribe({
      next: (data) => {
        this.getAllProduct = data;
      },
    });
  }
}
