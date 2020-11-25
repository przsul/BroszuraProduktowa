import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Product } from '../model/Product';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {

  products: Array<Product>;
  isAdmin: boolean;

  constructor(private dataService: DataService, private router: Router, private storageService: StorageService) { }

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

  ngAfterViewInit() {
    const role: string = this.storageService.getRoles();
    if (role === "ROLE_ADMIN")
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  onProductClick() {
    console.log("klik");
  }

  changeTrashIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/trash-red.svg";
    else
      event.target.attributes.src.value = "assets/img/trash-grey.svg";
  }

  changePencilIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/pencil-orange.svg";
    else
      event.target.attributes.src.value = "assets/img/pencil-grey.svg";
  }

  addToFavorite(event: any) {
    var productId = event.path[3].id;
    if (event.target.attributes.src.value === "assets/img/star-purple.svg")
      event.target.attributes.src.value = "assets/img/star-grey.svg";
    else {
      this.dataService.addToFavorite(productId).subscribe((response: any) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      });
      event.target.attributes.src.value = "assets/img/star-purple.svg";
    }
  }

  deleteProduct(event: any) {
    var productId = event.path[3].id;
    this.dataService.deleteProduct(productId).subscribe(() => {
      location.reload();
    }, (error) => {
      console.error(error);
    });
  }

}
