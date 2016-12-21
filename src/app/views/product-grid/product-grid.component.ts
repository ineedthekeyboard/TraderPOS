import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Product} from "../../models/product.model";
import {Order} from "../../models/order.model";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-product-grid',
  templateUrl: 'product-grid.component.html',
  styleUrls: ['product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  @Input() productsToDisplay: Observable<Product[]>;
  @Input() ordersToDisplay: Observable<Order[]>;
  @Input() storeMode: Boolean = false;
  @Input() orderMode: Boolean = false;
  @Input() summaryMode: Boolean = false;
  @Output() orderProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() updateProduct: EventEmitter<Product> = new EventEmitter<Product>();

  ProductChangeObservable: Subject<any> = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.ProductChangeObservable
      .debounceTime(400)
      .subscribe(product => {
        this.updateProduct.emit(product);
      });
  }

  ngOnChanges(changes) {
    //debugger;
    //this.updateProduct.emit(changes);
  }

  orderUpdated(val: any, product: Product) {
    this.ProductChangeObservable.next(product);
    //this.updateProduct.emit(product);
  }
  productOrderPressed(product: Product) {
    this.orderProduct.emit(product);
  }

  productDeletePressed(product: Product) {
    this.deleteProduct.emit(product);
  }
}
