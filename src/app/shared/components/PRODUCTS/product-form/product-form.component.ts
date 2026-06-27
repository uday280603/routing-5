import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/product.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isInEditMode: boolean = false;
  productId!: number;
  productObj!: Iproduct;

  constructor(
    private _productService: ProductService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
    this.onPatchData();
  }

  onCreateForm() {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  onAddProduct() {
    if (this.productForm.valid) {
      let NEW_OBJ = {
        ...this.productForm.value,
        id: Date.now(),
      };
      this._productService.onCreateProduct(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['products']);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onPatchData() {
    this.productId = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.isInEditMode = true;
      this._productService.fetchProductbyId(this.productId).subscribe({
        next: (data) => {
          this.productObj = data;
          this.productForm.patchValue(data)
        },
      });
    }
  }

  onUpdate(){
        if (this.productForm.valid) {
      let UPDATED_USER = {
        ...this.productForm.value,
        id: this.productId,
      };
      this._productService.onUpdateProduct(UPDATED_USER).subscribe({
        next: (data) => {
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['products']);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }

  }
}
