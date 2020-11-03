import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  jwtHelper = new JwtHelperService();

  getUsername(): string {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt'))['sub'];
  }

  getRoles(): string {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt'))['authorities'][0]['authority'];
  }
}
