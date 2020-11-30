import { CommentStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommentRating } from '../model/CommentRating';
import { Product } from '../model/Product';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  brochureHTML: SafeHtml;
  commentsRatings: Array<CommentRating>;
  noComments: boolean;
  product: Product;
  productId: number;

  addCommentRatingForm = new FormGroup({
    commentControl: new FormControl(''),
    ratingControl: new FormControl('')
  });
  
  get commentControl() { return this.addCommentRatingForm.get('commentControl'); }
  get ratingControl() { return this.addCommentRatingForm.get('ratingControl'); }

  constructor(private router: Router, private dataService: DataService, private sanitizer: DomSanitizer) { 
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        var splittedUrl = window.location.pathname.split('/');
        this.productId = parseInt(splittedUrl[splittedUrl.length-1]);
      }
    });
  }

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

    this.dataService.getProduct(this.productId).subscribe((response: Product) => {
      this.product = response;
      var tags = this.product["tags"].split(",");
      this.product.tags = tags;
    }, (error) => {
      console.error(error);
    });

    this.dataService.getCommentsRatings(this.productId).subscribe((response: Array<CommentRating>) => {
      this.commentsRatings = response;
    }, (error) => {
      this.noComments = true;
      console.error(error);
    });
  }

  onTrashIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/trash-red.svg";
    else
      event.target.attributes.src.value = "assets/img/trash-grey.svg";
  }

  onSubmit() {
    var commentRating: CommentRating = {
      comment: this.commentControl.value,
      id: null,
      productId: null,
      rating: this.ratingControl.value,
      username: null
    }

    this.dataService.addCommentRating(commentRating, this.productId).subscribe((response: any) => {
      location.reload();
    }, (error) => {
      console.error(error);
    });
  }
}
