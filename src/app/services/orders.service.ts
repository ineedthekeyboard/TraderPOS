import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Order} from "../models/order.model";
import {Observable} from "rxjs";

@Injectable()
export class OrdersService {
  private orderUrl = 'app/orders';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  create(order: Order) {
    order.Id = this.createId();
    return this.http.post(this.orderUrl, JSON.stringify(order), {headers: this.headers})
      .map(res => res.json().data);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.orderUrl).map(res => res.json().data);
  }

  update(order: Order): Observable<Order> {
    const url = `${this.orderUrl}/${order.id}`;
    return this.http
      .put(url, JSON.stringify(order), { headers: this.headers })
      .catch(this.handleError);
  }

  deleteOrder(order: Order): Observable<Order> {
    const url = `${this.orderUrl}/${order.id}`;
    return this.http.delete(url, { headers: this.headers })
      .catch(this.handleError);
  }
  private createId(): string {
    let uuid = 'oxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let  r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
