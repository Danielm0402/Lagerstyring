import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDDhlHVxqQ-g6qF6FlGPlTch5-LOPUnzI",
  authDomain: "lagerstyring-7ff2d.firebaseapp.com",
  projectId: "lagerstyring-7ff2d",
  storageBucket: "lagerstyring-7ff2d.appspot.com",
  messagingSenderId: "241953501810",
  appId: "1:241953501810:web:685ce8a5917fd01baec8eb",
};

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);

const productCollectionRef = collection(db, "Products");
const vanCollectionRef = collection(db, "Vans");
const userCollectionRef = collection(db, "Users");
const companiesCollectionRef = collection(db, "Companies");
const adminCollectionRef = collection(db, "Admins");

export async function getProductsFromDb() {
  let productQueryDocs = await getDocs(productCollectionRef);
  let products = productQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.productId = doc.id;
    return data;
  });
  return products;
} 
 
export async function updateUser(user) {
  const docRef = doc(db, "Users", user.employeeId)

  await updateDoc(docRef, user.toJSON())
}

export async function updateVan(van, ID) {
  const docRef = doc(db, "Vans", van.licensePlate);

  await updateDoc(docRef, { products: arrayUnion(ID) });

  console.log("van updateerered", van);
}

export async function addUserToDb(user) {
  const docRef = doc(db, "Users", user.employeeId);
  await setDoc(docRef, user.toJSON())
}

export async function addVanToDb(van) {
  const docRef = doc(db, "Vans", van.licensePlate);
  await setDoc(docRef, van.toJSON());
}
export async function addProductToDb(product) {
  const docRef = doc(db, "Products", product.productId);
  await setDoc(docRef, product.toJSON());
  console.log("firestore log");
}
export async function addCompanyToDb(company) {
  const docRef = doc(db, "Companies", company.cvr);
  await setDoc(docRef, company.toJSON());
}

export async function deleteProductFromDb(productId) {
  // delete product from database where products productID === productId
  const productRef = doc(productCollectionRef, productId);
  await deleteDoc(productRef);
  console.log("Deleted product: ", productId);
}

export async function deleteVanFromDb(licensePlate) {
  // delete van from database where van.licensePlate === licensePlate
  const vanRef = doc(vanCollectionRef, licensePlate);
  await deleteDoc(vanRef);
  console.log("Van deleted: ", licensePlate);
}

export async function deleteUserFromDb(employeeId){
  // delete user from database where user.employeeId === employeeId
  const userRef = doc(userCollectionRef, employeeId);
  await deleteDoc(userRef);
  console.log("user deleted: ", employeeId)
}

export async function getProductFromDb(productId) {
  const firestoreData = await getProductsFromDb();

  const products = firestoreData.filter(
    (product) => product.productId === productId
  );
  return products[0];
}

export async function getProductAmount(productId) {
  const docRef = doc(db, "Products", productId);
  const document = await getDoc(docRef);
  const data = document.data();
  return data.amount;
}

export async function setProductAmount(productId, amount) {
  const docRef = doc(db, "Products", productId);
  await updateDoc(docRef, {amount: amount});
}

export async function updateAmountToProduct(amount, productId) {
  const docRef = doc(db, "Products", productId);
  await updateDoc(docRef, { amount: amount });
}

export async function getVanFromDb(licensePlate) {
  const vanQueryDoc = doc(db, "Vans", licensePlate);
  const vanDoc = await getDoc(vanQueryDoc);
  const van = vanDoc.data();
  return van;
}

export async function getVansFromDb() {
  const vanQueryDocs = await getDocs(vanCollectionRef);
  let vans = vanQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.vanKey = doc.id;
    return data;
  });
  return vans;
}

export async function getUserVan(employeeId) {
  console.log("jordbærtærte", employeeId)
  const userDocRef = doc(db, "Users", employeeId);
  const user = (await getDoc(userDocRef)).data();
  console.log("drømmekage", user)
  if(user.van){
    console.log("kajkage", user.van)
    const vanLicensePlate = user.van;
    const vanDocRef = doc(db, "Vans", vanLicensePlate);
    const van = (await getDoc(vanDocRef)).data();
    return van
  }
  
  return false;
}

export async function getVanProducts(licensePlate) {
    const vanDocRef = doc(db, "Vans", licensePlate);
    const van = (await getDoc(vanDocRef)).data();
    const productIds = van.products;

    const allProducts = await getProductsFromDb();
    const vanProducts = allProducts.filter(p => productIds.includes(p.productId))

  return vanProducts;
}

export async function getUsersFromDb() {
  const userDocs = await getDocs(userCollectionRef);
  let users = userDocs.docs.map((doc) => {
    let data = doc.data();
    data.userId = doc.id;
    return data;
  });
  return users;
}

export async function getUser(employeeId) {
  const userDocRef = doc(db, "Users", employeeId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
}

async function test() {
  const products = await getProductsFromDb();
  const prod = products[0];
  console.log(prod.productId)
  await setProductAmount(prod.productId, 100);
}

// test();
