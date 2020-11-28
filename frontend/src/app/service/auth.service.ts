import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(private dataService: DataService) {}

  public isAuthenticated(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');

      if (token == null) {
        resolve(false);
      }
        
  
      this.dataService.validateToken(token).then((response: any) => {
        resolve(true);
      }, () => {
        resolve(false);
      });
    });
    
  }
  
}
