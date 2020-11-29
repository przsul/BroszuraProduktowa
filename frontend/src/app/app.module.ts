import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { EditProductPageComponent } from './edit-product-page/edit-product-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ProductsPageComponent,
    NavbarComponent,
    LogoutComponent,
    AddProductPageComponent,
    FavoritesPageComponent,
    EditProductPageComponent,
    ProductDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
