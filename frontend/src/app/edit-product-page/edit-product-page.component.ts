import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    productTags: new FormControl('', Validators.required)
  });
  
  get productName() { return this.editProductForm.get('productName'); }
  get productDescription() { return this.editProductForm.get('productDescription'); }
  get productTags() { return this.editProductForm.get('productTags'); }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.editProductForm.setValue({
      productName: this.dataService.product.name,
      productDescription: this.dataService.product.description,
      productTags: this.dataService.product.tags
    });
  }

  onSubmit() {
    var product: Product = {
      id: this.dataService.product.id,
      name: this.productName.value,
      description: this.productDescription.value,
      tags: this.productTags.value
    }
    
    this.dataService.editProduct(product).subscribe((response: any) => {
      this.router.navigate(['products']);
    }, (error) => {
      console.error(error);
    });
  }
}
