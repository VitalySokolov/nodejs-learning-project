import config from './config/config.json';
import {User, Product} from './models/index';

const user = new User();
const product = new Product();

console.log(user.name);
console.log(product.name);
console.log(config.name);
