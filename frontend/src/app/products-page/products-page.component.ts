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
export class ProductsPageComponent implements OnInit {

  products: Array<Product>;
  isAdmin: boolean;
  isEmptySet: boolean;

  constructor(private dataService: DataService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    const role: string = this.storageService.getRoles();
    if (role === "ROLE_ADMIN")
      this.isAdmin = true;
    else
      this.isAdmin = false;

    this.dataService.getProducts().subscribe((response: Array<Product>) => {
      this.products = response;
      for(var product of this.products) {
        var tags = product["tags"].split(",");
        product.tags = tags;
      }

      if (!this.isAdmin) {
        this.dataService.getFavoriteProducts().subscribe((response: Array<Product>) => {
          for(var favProduct of response) {
            let imgTag = document.getElementById(favProduct.id).children[1].children[0].children[0] as HTMLImageElement;
            imgTag.src = "assets/img/star-purple.svg";
          }
        }, (error) => {
          console.error(error);
        });
      }
    }, (error) => {
      console.error(error);
    });
  }

  onProductClick() {
    console.log("klik");
  }

  onTrashIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/trash-red.svg";
    else
      event.target.attributes.src.value = "assets/img/trash-grey.svg";
  }

  onPencilIcon(event: any) {
    if (event.type === "mouseover")
      event.target.attributes.src.value = "assets/img/pencil-orange.svg";
    else
      event.target.attributes.src.value = "assets/img/pencil-grey.svg";
  }

  onFavorite(event: any) {
    var productId: number = event.path[3].id;
    if (event.target.attributes.src.value === "assets/img/star-purple.svg") {
      this.dataService.deleteFromFavorite(productId).subscribe((response: any) => {
      }, (error) => {
        console.error(error);
      });    
      event.target.attributes.src.value = "assets/img/star-grey.svg";
    } else {
      this.dataService.addToFavorite(productId).subscribe((response: any) => {
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
