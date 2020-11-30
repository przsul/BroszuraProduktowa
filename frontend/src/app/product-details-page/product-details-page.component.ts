import { CommentStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommentRating } from '../model/CommentRating';
import { Product } from '../model/Product';
import { DataService } from '../service/data.service';
import { StorageService } from '../service/storage.service';

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
  username: string;
  role: string;
  
  addCommentRatingForm = new FormGroup({
    commentControl: new FormControl(''),
    ratingControl: new FormControl('')
  });
  
  get commentControl() { return this.addCommentRatingForm.get('commentControl'); }
  get ratingControl() { return this.addCommentRatingForm.get('ratingControl'); }

  constructor(private storageService: StorageService, private router: Router, private dataService: DataService, private sanitizer: DomSanitizer) { 
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        var splittedUrl = window.location.pathname.split('/');
        this.productId = parseInt(splittedUrl[splittedUrl.length-1]);
      }
    });
  }

  ngOnInit(): void {
    this.username = this.storageService.getUsername();
    this.role = this.storageService.getRoles();

    this.dataService.getProduct(this.productId).subscribe((response: Product) => {
      this.product = response;
      var tags = this.product["tags"].split(",");
      this.product.tags = tags;
      var brochure = response.brochure;
      this.brochureHTML = this.sanitizer.bypassSecurityTrustHtml(brochure);
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

  onTrashClick(event: any) {
    var commentRatingId = event.path[3].id
    this.dataService.deleteCommentRating(commentRatingId).subscribe((response: any) => {
      location.reload();
    }, (error) => {
      console.error(error);
    });
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
