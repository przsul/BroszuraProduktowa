import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtExpiredOrNotExistGuardService {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem('jwt');
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
