import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem("jwt");
      if (token == null) {
        resolve(true);
        return;
      }
        
      this.dataService.validateToken(token).then((response: any) => {
        this.router.navigate(["products"]);
        resolve(false);
      }).catch(() => {
        localStorage.removeItem("jwt");
        resolve(true);
      });
    });
  }
}
