import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LoginPageForm } from '../model/LoginPageForm';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  constructor(private dataService: DataService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var loginPageForm = new LoginPageForm(this.loginForm.value);
    
    this.dataService.authenticate(loginPageForm).subscribe((response: any) => {
      localStorage.setItem("jwt", response["jwt"]);

      if(localStorage.getItem("jwt"))
        this.router.navigate(["products"]);

    }, (error) => {
      console.error(error);
    });
  }

}
