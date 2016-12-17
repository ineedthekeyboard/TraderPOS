import {Component, OnInit} from "@angular/core";
import {Order} from "../../models/order.model";
import {OrdersService} from "../../services/orders.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-summary',
  templateUrl: 'order-summary.component.html',
  styleUrls: ['order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  productsOrdered: Order[] = [];

  constructor(private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.ordersService.get().then((orders) => {
    //   this.productsOrdered = orders;
    // });
  }

  goBack(): void {
    this.router.navigate(['order']);
  }
}
