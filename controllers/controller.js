import Van from "../models/van.js";
import Product from "../models/product.js";

import {
  addProductToDb,
  addVanToDb,
  getVanFromDb,
  updateVan,
  addCompanyToDb,
  addUserToDb,
  updateUser,
  getProductsFromDb,
  updateAssignedUserToVan,
  updateAssignedVanToUser,
  getUserFromDb,
} from "../database/Firestore.js";
import Company from "../models/company.js";
import User from "../models/user.js";
import { documentId } from "firebase/firestore";

export default class Controller {
  async createVan(vanNumber, licensePlate) {
    const van = new Van(vanNumber, licensePlate);
    console.log(van)
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
    const product = new Product(name, productID, amount, unit);
    await addProductToDb(product);
    return product;
  }

  async getVan(licensePlate) {
    const vanData = await getVanFromDb(licensePlate);
    const v = new Van(vanData.licensePlate);
    // console.log(vanData.electricians)
    // vanData.user.map(e => v.addUser(e))
    // vanData.products.map(p => v.addProduct(p))

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


  async updateVan(documentPath, employeeId){
    const newUser = await getUserFromDb(employeeId)
    console.log("safdsa updatevan controller", newUser)
    await updateAssignedUserToVan(documentPath, newUser)
  }

  async updateUser(documentPath, newVan){
    await updateAssignedVanToUser(documentPath, newVan)
  }


}

// test();
