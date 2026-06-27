import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/NAVBAR/navbar/navbar.component';
import { HomeComponent } from './shared/components/NAVBAR/home/home.component';
import { ProductDashboardComponent } from './shared/components/PRODUCTS/product-dashboard/product-dashboard.component';
import { ProductComponent } from './shared/components/PRODUCTS/product/product.component';
import { ProductFormComponent } from './shared/components/PRODUCTS/product-form/product-form.component';
import { MaterialModule } from './shared/module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './shared/components/NAVBAR/get-confirm/get-confirm.component';
import { UserDashboardComponent } from './shared/components/USERS/user-dashboard/user-dashboard.component';
import { UserComponent } from './shared/components/USERS/user/user.component';
import { UserFormComponent } from './shared/components/USERS/user-form/user-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductDashboardComponent,
    ProductComponent,
    ProductFormComponent,
    GetConfirmComponent,
    UserDashboardComponent,
    UserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
