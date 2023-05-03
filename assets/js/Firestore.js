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
  updateDoc
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

let productCollectionRef = collection(db, "Products");
let vanCollectionRef = collection(db, "Vans")
let electriciansCollectionRef = collection(db, "Electricians")

export async function getDataFromFirestore() {
  let productsQueryDocs = await getDocs(productCollectionRef);
  let products = productsQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.productId = doc.id;
    return data;
  });
  return products;
}

export async function getDbProduct(productId) {
  const firestoreData = await getDataFromFirestore()

  const products = firestoreData.filter((product) => product.productId === productId)
  return products[0]
}

export async function updateAmountToProduct(amount, productId) {
  const docRef = doc(db, 'Products', productId)
  const productDoc = await getDoc(docRef);
  const productData = productDoc.data()
  const newAmount = productData.amount + amount
  await updateDoc(docRef, {amount: newAmount})
  return newAmount
}

export async function addVanToDb(van) {
  const vanDocRef = await addDoc(vanCollectionRef, van)
  console.log("Adding van")
}

async function test() {
  let productsQueryDocs = await getDocs(productCollectionRef);
  let products = productsQueryDocs.docs.map((doc) => {

    let data = doc.data();
    data.productId = doc.id;
    console.log(data)
  });
}

// test();

//   const q = query(
//     registrationsCollection,
//     where("companyToken", "==", "YMVOcbfrry6WtWcIgenGBsus7zAhduf6bc87WaqI81w1"),
//     where("employeeNo", "==", 1)
//   );

//   console.log("q: ", q);

//   getDocs(q).then((querySnapshot) => {
//     let totalHours = 0;
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       totalHours += data.totalHours;
//     });
//     console.log(totalHours);
//   });