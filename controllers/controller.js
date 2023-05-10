import Van from "../models/van.js";
import Product from "../models/product.js";

import { addProductToDb, addVanToDb, getVanFromDb, updateVan, addCompanyToDb, addUserToDb, updateUser } from "../database/Firestore.js";
import Company from "../models/company.js";
import User from "../models/user.js";

export default class Controller {

  async createVan(licensePlate) {
    const van = new Van(licensePlate);

    await addVanToDb(van);
    return van;
  }

  async createUser(name, employeeId, username, password, role) {
    const user = new User(name, employeeId, username, password, role);
    await addUserToDb(user);
    return user;
  }

  async addUserToVan(user, van) {
    van.addUser(user);
    user.addVan(van);
    await updateVan(van);
    await updateUser(user);
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
    vanData.user.map(e => v.addUser(e))
    vanData.products.map(p => v.addProduct(p))

    return v 
  }

  async createCompany(name, cvr, contactpersonName, contactpersonNumber) {
    const company = new Company(name, cvr, contactpersonName, contactpersonNumber)

    await addCompanyToDb(company)
    return company
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
}

// test();
