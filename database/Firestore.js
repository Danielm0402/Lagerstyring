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
const electriciansCollectionRef = collection(db, "Electricians");
const userCollectionRef = collection(db, "Users");
const companiesCollectionRef = collection(db, "Companies")
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
 
export async function updateElectrician(electrician) {
  const docRef = doc(db, "Electricians", electrician.employeeId)

  await updateDoc(docRef, electrician.toJSON())
}

export async function updateVan(van) {
  const docRef = doc(db, "Vans", van.licensePlate)

  await updateDoc(docRef, van.toJSON())
}

export async function addElectricianToDb(electrician) {
  const docRef = doc(db, "Electricians", electrician.employeeId);
  await setDoc(docRef, electrician.toJSON())
}
export async function addVanToDb(van) {
  const docRef = doc(db, "Vans", van.licensePlate)
  await setDoc(docRef, van.toJSON());
}
export async function addProductToDb(product) {
  const docRef = doc(db, "Products", product.productId);
  await setDoc(docRef, product.toJSON())
  console.log("firestore log");
} 
export async function addCompanyToDb(company){
  const docRef = doc(db, "Companies", company.cvr);
  await setDoc(docRef, company.toJSON())
}

export async function deleteProductFromDb(productId) {
  console.log("4444");
  
  // delete product from database where products productID === productId
  const productRef = doc(productCollectionRef, productId);
  await deleteDoc(productRef);
  console.log("deleted procuctasf");
}

export async function deleteVanFromDb(licensePlate) {
  console.log("yay deleteVanFromDb virker", licensePlate);

  const vanRef = doc(vanCollectionRef, licensePlate);
  await deleteDoc(vanRef);
  console.log("van deleted");
}

export async function deleteElectricianFromDb(employeeId){
  const electricanRef = doc(electriciansCollectionRef, employeeId);
  await deleteDoc(electricanRef);
  console.log("electrican deleted")
}

export async function getProductFromDb(productId) {
  const firestoreData = await getProductsFromDb();

  const products = firestoreData.filter(
    (product) => product.productId === productId
  );
  return products[0];
}


export async function updateAmountToProduct(amount, productId) {
  const docRef = doc(db, "Products", productId);
  const productDoc = await getDoc(docRef);
  const productData = productDoc.data();
  const newAmount = productData.amount + amount;
  await updateDoc(docRef, { amount: newAmount });
  return newAmount;
}


export async function getVanFromDb(licensePlate) {
  const vanQueryDoc = doc(db, "Vans", licensePlate);
  const vanDoc = await getDoc(vanQueryDoc);
  const van = vanDoc.data()
  return van
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

export async function getElectriciansFromDb(){
  const electricianQueryDocs = await getDocs(electriciansCollectionRef);
  let electricians = electricianQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.employeeId = doc.id;
    return data;
  })
  return electricians;
}

export async function getAdminsFromDb() {
  const adminQueryDocs = await getDocs(adminCollectionRef);
  let admins = adminQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.employeeId = doc.id;
    return data;
  })
  return admins;
}

export async function getElectricianVans(employeeId) {
  const electricianDocRef = doc(db, "Electricians", employeeId);
  const electrician = (await getDoc(electricianDocRef)).data();
  const vanLicensePlate = electrician.vans[0];
  const vanDocRef = doc(db, "Vans", vanLicensePlate);
  const van = (await getDoc(vanDocRef)).data();
  return van;
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
  })
  return users;
}

async function test() {
  let productsQueryDocs = await getDocs(productCollectionRef);
  let products = productsQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.productId = doc.id;
    console.log(data);
  });
} 
