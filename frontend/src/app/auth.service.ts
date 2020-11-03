import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
