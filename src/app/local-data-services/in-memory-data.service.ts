/**
 * Created by rcarlton1 on 11/9/2016.
 */
import {InMemoryDbService} from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let products = [
      {
        id: 'p3bbe132-6485-48a2-80e6-05d9bb9b3904',
        name: 'bannana',
        price: 10,
        units: 'lbs'
      }, {
        id: "p6bfee20-bd65-4aea-af4e-a021d9c7647b",
        name: 'mango',
        price: 2,
        units: 'lbs'
      }, {
        id: "p38a748a-158c-4253-8216-96de27c5f799",
        name: 'apple',
        price: 12,
        units: 'lbs'
      }, {
        id: "p1b19b02-e715-438b-84df-3bd72c328a34",
        name: 'grape',
        price: 5,
        units: 'kg'
      }
    ];
    let orders = [];
    return {products, orders};
  }
}
