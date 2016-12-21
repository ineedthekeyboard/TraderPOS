import {Component, OnInit, HostBinding, trigger, transition, animate, style, state} from "@angular/core";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: 'order-page.component.html',
  styleUrls: ['order-page.component.scss'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class OrderPageComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }

  ordersToDisplay: Observable<Order[]> = Observable.from([]);
  orderSummary: any = {
    ordersCount: 0,
    totalCost: 0
  };


  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.ordersToDisplay = this.ordersService.getOrders();
    this.ordersToDisplay.subscribe(order => {
      this.calculatePrices(order);
    });
  }

  calculatePrices(order: Order[]): void {
    this.orderSummary.ordersCount = order.length || 0;
    this.orderSummary.totalCost = 0;
    for (let i in order) {
      let unitPrice = order[i]['PricePer' + order[i]['units']];
      let numberOfUnits = order[i]['number'];
      this.orderSummary.totalCost += ((unitPrice * numberOfUnits) + 1.20) * 4;
    }
  }

  deleteSpecificProduct(productToRemove: Order): void {
    let productsAfterRemoval = [];
    let currentProducts = [];
    this.ordersToDisplay.subscribe(results => {
      //todo remove this call back after subscribe.
      //right now subscribe is working asyncrounously
      currentProducts = results;
      productsAfterRemoval = currentProducts.filter((obj) => {
        return obj.Id !== productToRemove.Id;
      });
      this.ordersService.deleteOrder(productToRemove).subscribe(result => {
        this.ordersToDisplay = Observable.from(productsAfterRemoval).toArray();
      });
      this.ordersToDisplay.subscribe(order => {
        this.calculatePrices(order);
      });
    });
  }

}
