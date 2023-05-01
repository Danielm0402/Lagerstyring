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

let productCollection = collection(db, "Varer");

export async function getDataFromFirestore() {
  let varerQueryDocs = await getDocs(vareCollection);
  let varer = varerQueryDocs.docs.map((doc) => {
    let data = doc.data();
    data.docID = doc.id;
    return data;
  });
  return varer;
}

export async function getProduct(productId) {
  const firestoreData = await getDataFromFirestore()

  const product = firestoreData.filter((product) => product.docID === productId)
  return product[0]
}

export async function addAmountToProduct(amount, productId) {
  const docRef = doc(db, 'Varer', productId)
  const productDoc = await getDoc(docRef);
  const productData = productDoc.data()
  const newAmount = productData.amount + amount
  await updateDoc(docRef, {amount: newAmount})
}

async function test() {
  console.log(await getProduct("QnZZpRrwYWUCUoatQfQ5"))

  await addAmountToProduct(10, "QnZZpRrwYWUCUoatQfQ5")

  console.log(await getProduct("QnZZpRrwYWUCUoatQfQ5"))
}

test();

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