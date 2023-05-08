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

export async function getProductsFromDb() {
  let productQueryDocs = await getDocs(productCollectionRef);
  let products = productQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.productId = doc.id;
    return data;
  });
  return products;
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

export async function createProduct(product) {
  const docRef = await addDoc(productCollectionRef, product);
  console.log("firestore log");
}

export async function updateAmountToProduct(amount, productId) {
  const docRef = doc(db, "Products", productId);
  const productDoc = await getDoc(docRef);
  const productData = productDoc.data();
  const newAmount = productData.amount + amount;
  await updateDoc(docRef, { amount: newAmount });
  return newAmount;
}

export async function addVanToDb(van) {
  await setDoc(doc(db, "Vans", van.licensePlate), van);
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

export async function addElectricianToDb(electrician){
  await setDoc(doc(db, "Electricians", electrician.employeeId), electrician);
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

async function test() {
  let productsQueryDocs = await getDocs(productCollectionRef);
  let products = productsQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.productId = doc.id;
    console.log(data);
  });
}
