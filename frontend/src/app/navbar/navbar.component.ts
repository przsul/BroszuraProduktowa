import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
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
