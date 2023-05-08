import Electrician from "../models/electrician.js";
import Van from "../models/van.js";

import { createProduct, addVanToDb, getVanFromDb, addElectricianToDb, updateVan, updateElectrician } from "../database/Firestore.js";

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

  createProductToDB(product) {
    createProduct(product);
    console.log("det virker");
  }

  async getVanProducts(licensePlate) {
    const van = await getVanFromDb(licensePlate)

    console.log(van)
  }
}


async function test() {
  const c = new Controller();

  const e = await c.createElectrician("Kirsten", "10");
  const v = await c.createVan("LKDF 3819836");

  await c.addElectricianToVan(e, v);
}

test();
