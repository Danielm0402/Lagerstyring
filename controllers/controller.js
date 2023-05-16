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
  getVansFromDb,
  getProductFromDb,
  deleteProductFromDb,
  getProductAmount,
  setProductAmount,
  deleteVanFromDb,
  getUsersFromDb,
  deleteUserFromDb,
  getUser,
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
    await addVanToDb(van)
    return van
  }

  // async createVan(licensePlate, user) {
  //   const van = new Van(licensePlate, );
  //   van.user = user;

  //   await addVanToDb(van);
  //   return van;
  // }

  async createUser(name, employeeId, username, password, role) {
    const user = new User(name, employeeId, username.toLowerCase(), password, role);
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
    const v = new Van(vanData.vanNumber, vanData.licensePlate);
    return v;
  }

  async getVans() {
    const vansData = await getVansFromDb();
    return vansData;
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

  async getProducts() {
    const products = await getProductsFromDb();
    return products;
  }

  async getProduct(productId) {
    const product = getProductFromDb(productId);
    return product;
  }

  async deleteProduct(productId) {
    await deleteProductFromDb(productId);
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
    await updateVan(van, product.productId);
  }

  async adjustProductAmount(productId, amount) {
    let productAmount = await getProductAmount(productId);
    productAmount += amount;
    await setProductAmount(productId, productAmount)
    return productAmount;
  }

  async getProductAmount(productId) {
    return await getProductAmount(productId);
  }

  async deleteVan(licensePlate) {
    await deleteVanFromDb(licensePlate);
  }

  async getUsers() {
    const usersData = await getUsersFromDb();
    return usersData;
  }

  async deleteUser(employeeId) {
    await deleteUserFromDb(employeeId);
  }

  async getUserVan(employeeId) {
    const user = await getUser(employeeId);
    let van = undefined
    if (user.van) {
      van = await getVanFromDb(user.van);
    }
    return van
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

async function test() {
  const controller = new Controller();

  const users = await controller.getUsers();
  const user = users[1];
  const van = await controller.getUserVan(user.employeeId)

  console.log(van);
}

// test();
