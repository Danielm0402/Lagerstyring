import Electrician from "../models/electrician.js";
import Van from "../models/van.js";
import Product from "../models/product.js";

import {
  addProductToDb,
  addVanToDb,
  getVanFromDb,
  addElectricianToDb,
  updateVan,
  updateElectrician,
  addCompanyToDb,
  getProductsFromDb,
} from "../database/Firestore.js";
import Company from "../models/company.js";

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
    const product = new Product(name, productID, amount, unit);
    await addProductToDb(product);
    return product;
  }

  async getVan(licensePlate) {
    const vanData = await getVanFromDb(licensePlate);
    const v = new Van(vanData.licensePlate);
    // console.log(vanData.electricians)
    // vanData.electricians.map((e) => v.addElectrician(e));
    // vanData.products.map((p) => v.addProduct(p));

    return v;
  }

  async createCompany(name, cvr, contactpersonName, contactpersonNumber) {
    const company = new Company(
      name,
      cvr,
      contactpersonName,
      contactpersonNumber
    );

    await addCompanyToDb(company);
    return company;
  }

  async getVanProducts(licensePlate) {
    const van = await getVanFromDb(licensePlate);
    const vanProductIds = van.products;
    const allProducts = await getProductsFromDb();

    const vanProducts = allProducts.filter((p) =>
      vanProductIds.includes(p.productId)
    );

    return vanProducts;
  }

  async addProductToVan(product, van) {
    console.log("productid:sasdf ", product.productId);
    await updateVan(van, product.productId);
  }
}

async function test() {}

// test();
