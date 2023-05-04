import Electrician from "../models/electrician.js";
import Van from "../models/van.js";

import { createProduct, addVanToDb } from "../database/Firestore.js";

export function test() {
  console.log("test");
}

export default class Controller {
  test() {
    const v = new Van("Ab12345");
    const e = new Electrician("Oliver");
    v.addElectrician(e);
    e.addVan(v);
  }

  async createVan(licensePlate, owner) {
    const van = new Van(licensePlate, owner);
    await addVanToDb(van.toJSON());
    return van;
  }

  createProductToDB(product) {
    createProduct(product);
    console.log("det virker");
  }
}
