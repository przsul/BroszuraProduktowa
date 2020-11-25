import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean;
  isAdmin: boolean;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        const role: string = this.storageService.getRoles();
        if (role === "ROLE_ADMIN")
          this.isAdmin = true;
        else
          this.isAdmin = false;

        if (window.location.href.includes("login"))
          this.showNavbar = false;
        else if (window.location.href.includes("register"))
          this.showNavbar = false;
        else
          this.showNavbar = true;
      }
    });
  }

}
