import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  username: string;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.username = this.storageService.getUsername();
  }

}
