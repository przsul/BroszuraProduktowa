import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '../model/Product';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.css']
})
export class EditProductPageComponent implements OnInit {

  editProductForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    productBrochure: new FormControl('', Validators.required),
    productTags: new FormControl('', Validators.required)
  });
  productId: number;

  get productName() { return this.editProductForm.get('productName'); }
  get productDescription() { return this.editProductForm.get('productDescription'); }
  get productBrochure() { return this.editProductForm.get('productBrochure'); }
  get productTags() { return this.editProductForm.get('productTags'); }

  constructor(private dataService: DataService, private router: Router) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        var splittedUrl = window.location.pathname.split('/');
        this.productId = parseInt(splittedUrl[splittedUrl.length-1]);
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getProduct(this.productId).subscribe((response: any) => {
      console.log(response)
      this.editProductForm.setValue({
        productName: response.name,
        productDescription: response.description,
        productBrochure: response.brochure,
        productTags: response.tags
      });
    }, (error) => {
      console.log(error);
    });
  }

  onSubmit() {
    var product: Product = {
      id: this.productId.toString(),
      name: this.productName.value,
      description: this.productDescription.value,
      brochure: this.productBrochure.value,
      tags: this.productTags.value
    }
    
    this.dataService.editProduct(product).subscribe((response: any) => {
      this.router.navigate(['products']);
    }, (error) => {
      console.error(error);
    });
  }
}
