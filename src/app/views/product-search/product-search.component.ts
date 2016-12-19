import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Product} from "../../models/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-search',
  templateUrl: 'product-search.component.html',
  styleUrls: ['product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchBoxValue: string = '';
  @Input() allProducts: Observable<Product[]>;
  @Output() searchedTerm: EventEmitter<String> = new EventEmitter<String>();
  @Output() addItem: EventEmitter<String> = new EventEmitter<String>();

  constructor() {
  }

  ngOnInit() {
  }

  search(): void {
    this.searchedTerm.emit(this.searchBoxValue);
  }

  addProduct(): void {
    this.addItem.emit(this.searchBoxValue);
  }

}
