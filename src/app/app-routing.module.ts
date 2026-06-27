import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/NAVBAR/home/home.component';
import { ProductDashboardComponent } from './shared/components/PRODUCTS/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './shared/components/PRODUCTS/product-form/product-form.component';
import { ProductComponent } from './shared/components/PRODUCTS/product/product.component';
import { UserDashboardComponent } from './shared/components/USERS/user-dashboard/user-dashboard.component';
import { UserComponent } from './shared/components/USERS/user/user.component';
import { UserFormComponent } from './shared/components/USERS/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductDashboardComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
      },
      {
        path: ':id',
        component: ProductComponent,
      },
      {
        path: ':id/edit',
        component: ProductFormComponent,
      },
    ],
  },
  {
    path: 'users',
    component: UserDashboardComponent,
    children: [
      {
        path: 'addUser',
        component: UserFormComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
      {
        path: ':id/edit',
        component: UserFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
