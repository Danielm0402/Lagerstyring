import Electrician from "../models/electrician.js";
import Van from "../models/van.js";

import { createProduct, addVanToDb, getVanFromDb, addElectricianToDb } from "../database/Firestore.js";

export function test() {
  console.log("test");
}

export default class Controller {

  async createVan(licensePlate) {
    const van = new Van(licensePlate);

    await addVanToDb(van);
    return van;
  }

  async createElectrician(name, employeeId) {
    const e = new Electrician(name, employeeId);

    await addElectricianToDb(e);
  }

  async addElectricianToVan(electrician, van) {
    van.addElectrician(electrician);
    electrician.addVan(van);
    await addVanToDb(van) /* hvis en van allerede har det samme id i db, bliver den erstattet */
    await addElectricianToDb(electrician);
  }

  async createElectrician(name, employeeId){
    const electrician = new Electrician(name, employeeId);
    await addElectricianToDb(electrician.toJSON());
    return electrician;
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

  const e = await c.createElectrician("Torben", "AB8327596297ijfsj");
  const v = await c.createVan("GG 123 64");

  addElectricianToVan(e, v);
}

test();
