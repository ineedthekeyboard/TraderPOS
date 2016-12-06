import {Product} from '../product-model/product.model';

export class Order extends Product {
  orderId: string;
  productId: number;
  constructor(product: Product) {
    super();
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.number = product.number;
    this.units = product.units;
    this.id = '';
  }

}
