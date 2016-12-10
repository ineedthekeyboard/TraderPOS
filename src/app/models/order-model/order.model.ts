import {Product} from '../product-model/product.model';

export class Order extends Product {
  orderId: string;
  productId: number;
  constructor(product: Product) {
    super();
    this.productId = product.Id;
    this.Name = product.Name;
    this.PricePerPound = product.PricePerPound;
    this.number = product.number;
    this.units = product.units;
    this.Id = '';
  }

}
