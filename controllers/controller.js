import Electrician from "../models/electrician.js";
import Van from "../models/van.js";
import Product from "../models/product.js";

import { addProductToDb, addVanToDb, getVanFromDb, addElectricianToDb, updateVan, updateElectrician } from "../database/Firestore.js";

// export function test() {
//   console.log("test");
// }

export default class Controller {

  async createVan(licensePlate) {
    const van = new Van(licensePlate);

    await addVanToDb(van);
    return van;
  }

  async createElectrician(name, employeeId) {
    const e = new Electrician(name, employeeId);
    await addElectricianToDb(e);
    return e;
  }

  async addElectricianToVan(electrician, van) {
    van.addElectrician(electrician);
    electrician.addVan(van);
    await updateVan(van);
    await updateElectrician(electrician);
  }

  async createProduct(name, productID, amount, unit) {
    const product = new Product(name, productID, amount, unit)
    await addProductToDb(product);
    return product
  }

  async getVan(licensePlate) {
    const vanData = await getVanFromDb(licensePlate)
    const v = new Van(vanData.licensePlate);
    // console.log(vanData.electricians)
    vanData.electricians.map(e => v.addElectrician(e))
    vanData.products.map(p => v.addProduct(p))

    return v 
  }

  async getVanProducts(licensePlate) {
    const van = await getVanFromDb(licensePlate)
    console.log(van.products)
    return van.products
  }

  async addProductToVan(product, van) {
    van.addProduct(product);
    console.log("firebase: ", van)
    await updateVan(van);
  }


}


async function test() {
  // const v = new Van("123123123");
  // const p = new Product("p1", "111", 10, "stk")
  // v.addProduct(p);

  // console.log(v)

}

test(); 
 