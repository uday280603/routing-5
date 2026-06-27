import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/product.service';
import { GetConfirmComponent } from '../../NAVBAR/get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productObj!: Iproduct;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _matDialog : MatDialog,
    private _snackbar : SnackbarService,
    private  _router : Router

  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this._activatedRoute.paramMap.subscribe(param =>{
      this.productId = +param.get('id')!
      this._productService.fetchProductbyId(this.productId).subscribe({
        next : data =>{
          this.productObj = data;
        }
      })
    })
  }
    onRemoveProduct() {
    let config = new MatDialogConfig();
    config.width = '400px';
    config.disableClose = true;
    config.data = `Are you sure to remove the product with id ${this.productId}..?`;
    let _matRef = this._matDialog.open(GetConfirmComponent, config);
    _matRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this._productService.onRemove(this.productId).subscribe({
          next: (data) => {
            this._snackbar.opensnackbar(data.msg);
            this._router.navigate(['products']);
          },
        });
      }
    });
  }
}
