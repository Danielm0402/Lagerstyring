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

  async createElectrician(name, employeeId){
    const electrician = new Electrician(name, employeeId);
    await addElectricianToDb(electrician.toJSON());
    return electrician;
  }

  async createProduct(name, productID, amount, unit) {
    const product = new Product(name, productID, amount, unit)
    await addProductToDb(product);
    console.log("det virker");
  }

  async getVanProducts(licensePlate) {
    const van = await getVanFromDb(licensePlate)

    console.log(van)
  }
}


async function test() {
}

test();
