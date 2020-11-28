import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { RegisterPageForm } from '../model/RegisterPageForm';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  showInfo: boolean;
  infoMessage: string;
  
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var registerPageForm = new RegisterPageForm(this.registerForm.value);
    
    this.dataService.register(registerPageForm).subscribe((response: any) => {
      this.infoMessage = "Registered successfully.";
      this.showInfo = true;
    }, (error) => {
      console.error(error);
    });
  }

}
