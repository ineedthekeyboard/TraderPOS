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

  constructor(private ordersService: OrdersService) {
    this.ordersToDisplay = ordersService.get();
    this.ordersToDisplay.subscribe(o=>console.log(o));
  }

  ngOnInit() {
  }

}
