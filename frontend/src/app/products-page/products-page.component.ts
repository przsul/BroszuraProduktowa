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
    // this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd) {
        const role: string = this.storageService.getRoles();
        if (role === "ROLE_ADMIN")
          this.isAdmin = true;
        else
          this.isAdmin = false;
    //   }
    // });
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

  deleteProduct(event: any) {
    var productId = event.path[3].id;
    this.dataService.deleteProduct(productId).subscribe((response: any) => {
      location.reload();
    }, (error) => {
      console.error(error);
    });
  }

}
