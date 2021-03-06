import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { EditProductPageComponent } from './edit-product-page/edit-product-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginGuardService } from './service/login-guard.service';
import { ValidateTokenGuardService } from './service/validate-token-guard.service';


const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuardService] },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductsPageComponent, canActivate: [ValidateTokenGuardService] },
  { path: 'favorites', component: FavoritesPageComponent, canActivate: [ValidateTokenGuardService] },
  { path: 'addProduct', component: AddProductPageComponent, canActivate: [ValidateTokenGuardService] },
  { path: 'editProduct/:productId', component: EditProductPageComponent, canActivate: [ValidateTokenGuardService] },
  { path: 'productDetails/:productId', component: ProductDetailsPageComponent, canActivate: [ValidateTokenGuardService] },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
