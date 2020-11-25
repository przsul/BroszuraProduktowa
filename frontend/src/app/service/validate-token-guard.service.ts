import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuardService implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem("jwt");
      if (token == null) {
        this.router.navigate([""]);
        resolve(false);
      }

      this.dataService.validateToken(token).then((response: any) => {
        resolve(true);
      }).catch(() => {
        localStorage.removeItem("jwt");
        this.router.navigate([""]);
        resolve(false);
      });
    });
  
  } 
}
