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
    })
  }

  // create(product: Product): Promise<Product> {
  //   product.id = this.createId();
  //   return this.http
  //     .post(this.productUrl, JSON.stringify(product), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }

  getProducts(): FirebaseListObservable<Product[]> {
    return this.products;
    //return a promise that subscribes to the observable
    // return new Promise((res, rej) => {
    //   try {
    //     this.products.subscribe((products)=>{
    //       res(products);
    //     });
    //   } catch (err){
    //     rej(err)
    //   }
    // }).catch(this.handleError);
  }

  create(newName: string) {
    this.products.push({ text: newName });
  }
  update(key: string, newText: string) {
    this.products.update(key, { text: newText });
  }
  delete(key: string) {
    this.products.remove(key);
  }
  deleteEverything() {
    this.products.remove();
  }
  //
  // getProduct(id: number): Promise<Product> {
  //   return this.getProducts().then((products) => products.find((product) => product.id === id));
  // }
  //
  // update(product: Product): Promise<Product> {
  //   const url = `${this.getProduct(product.id)}/${product.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(product), {headers: this.headers})
  //     .toPromise()
  //     .then(() => product).catch(this.handleError);
  // }
  //
  // delete(product: Product): Promise<void> {
  //   const url = `${this.productUrl}/${product.id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  //
  private createId(): string {
      let uuid = 'pxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
