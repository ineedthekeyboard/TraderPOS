import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Product} from '../models/product-model/product.model';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ProductsService {


  private products: FirebaseListObservable<any>;

  // private productUrl = 'app/products';
  // private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              af: AngularFire) {
    this.products = af.database.list('/products');
    this.products.subscribe((p)=>{
      console.log("products now:");
      console.log(p);
    });
  }

  getProducts(): FirebaseListObservable<Product[]> {
    return this.products;
  }

  // create(newName: string) {
  //   this.products.push({ text: newName });
  // }
  // update(key: string, newText: string) {
  //   this.products.update(key, { text: newText });
  // }
  // delete(key: string) {
  //   this.products.remove(key);
  // }
  // deleteEverything() {
  //   this.products.remove();
  // }
  // private createId(): string {
  //     let uuid = 'pxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //       let  r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //       return v.toString(16);
  //     });
  //     return uuid;
  // }
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
