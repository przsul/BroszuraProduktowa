import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  username: string;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.username = this.storageService.getUsername();
  }

}
