import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../model/model/Product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: Array<Product>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((response: Array<Product>) => {

      console.log(response);

      this.products = response;
      for(var product of this.products) {
        var tags = product["tags"].split(",");
        product.tags = tags;
      }

    }, (error) => {
      console.error(error);
    });
  }

}
