import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {

  addProductForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    productBrochure: new FormControl(''),
    productTags: new FormControl('', Validators.required)
  });
  
  get productName() { return this.addProductForm.get('productName'); }
  get productDescription() { return this.addProductForm.get('productDescription'); }
  get productBrochure() { return this.addProductForm.get('productBrochure'); }
  get productTags() { return this.addProductForm.get('productTags'); }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var product: Product = {
      id: null,
      name: this.productName.value,
      description: this.productDescription.value,
      brochure: this.productBrochure.value,
      tags: this.productTags.value
    }

    this.dataService.addProduct(product).subscribe((response: any) => {
      this.router.navigate(['products']);
    }, (error) => {
      console.error(error);
    });
  }
}
