import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product-model/product.model';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
//import "rxjs/rx";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-search',
  templateUrl: 'product-search.component.html',
  styleUrls: ['product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  products: Observable<Product[]> = Observable.from([]);
  allProducts: FirebaseListObservable<Product[]>;
  searchTerm: string;
  searchBoxValue: string = '';

  @Output() productSelected: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    //Gets an observable from angularfire
    this.allProducts = this.productsService.getProducts();
  }

  addProduct(product: Product): void {
    this.productSelected.emit(product);
    this.searchBoxValue = '';
    this.search();
  }

  enterPressedAddProduct(): void {
    //Only allow the first found product to be emitted.
    let emittedValue: boolean = false;
    //get the values from the observable
    this.allProducts.subscribe((products) => {
      let productsFiltered = products.filter(p => p.Name.toLowerCase().includes(this.searchTerm));
      if (productsFiltered.length > 0 && !emittedValue) {
        emittedValue = true;
        this.productSelected.emit(productsFiltered[0]);
      }
    });
  }

  search(): void {
    let term = this.searchBoxValue;
    this.products = this.allProducts.debounceTime(300).map(products => {
      return products.filter(p => p.Name.toLowerCase().includes(this.searchTerm));
    });
    this.searchTerm = term;
    if (this.searchTerm === '' || !this.searchTerm) {
      this.products = Observable.from([]); //Create Empty Observable
      return;
    }
  }

}
