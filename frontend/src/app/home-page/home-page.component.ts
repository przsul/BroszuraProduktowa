import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  brochure: string;
  asd: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.brochure = `
      <style>
        .red {
          border: 3px dotted red;
        }
      </style>
      <span class="red"><strong>asd</strong></span>
    `;
    this.asd = this.sanitizer.bypassSecurityTrustHtml(this.brochure);
  }

}
