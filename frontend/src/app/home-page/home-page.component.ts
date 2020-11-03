import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private storageService: StorageService, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.validateToken(localStorage.getItem('jwt')).subscribe((response: any) => {

      console.log(JSON.stringify(response, null, 2));

      if (this.storageService.getRoles() == "ROLE_USER")      
        this.router.navigateByUrl('user', { skipLocationChange: true });
      else if (this.storageService.getRoles() == "ROLE_ADMIN")
        this.router.navigateByUrl('admin', { skipLocationChange: true });

    }, () => {
      localStorage.removeItem('jwt');
      this.router.navigate(['']);
    });
  }

}
