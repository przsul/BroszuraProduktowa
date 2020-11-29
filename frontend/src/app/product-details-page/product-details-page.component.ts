import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  brochureHTML: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var brochure = `
      <div class="card" style="max-width: 800px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2018/9/pr_2018_9_13_9_9_29_650_00.jpg" class="card-img">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
      </div>
    `;
    this.brochureHTML = this.sanitizer.bypassSecurityTrustHtml(brochure);
  }

  onTrashIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/trash-red.svg";
    else
      event.target.attributes.src.value = "assets/img/trash-grey.svg";
  }

}
