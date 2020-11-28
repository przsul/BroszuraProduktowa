import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {

  products: Array<Product>;
  isEmptySet: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFavoriteProducts().subscribe((response: Array<Product>) => {
      this.products = response;
      if (this.products.length == 0) {
        this.isEmptySet = true;
        return;
      }
      for(var product of this.products) {
        var tags = product["tags"].split(",");
        product.tags = tags;
      }
    }, (error) => {
      console.error(error);
    });
  }

  onFavorite(event: any) {
    var productId: number = event.path[3].id;
    if (event.target.attributes.src.value === "assets/img/star-purple.svg") {
      this.dataService.deleteFromFavorite(productId).subscribe((response: any) => {
        location.reload();
      }, (error) => {
        console.error(error);
      });    
    }
  }
}
