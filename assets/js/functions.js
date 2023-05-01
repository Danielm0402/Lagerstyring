// import { getDataFromFirestore } from "./Firestore.js";

document.getElementById("addButton");

function x() {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    console.log("Hej");
  });
}

const deleteButtonElements = document.getElementsByClassName("delete-button");

for (const e of deleteButtonElements) {
  e.addEventListener("click", () => {
    const productboksediv = e.parentElement.parentElement;
    productboksediv.remove();
  });
}

const increaseButtonElements = document.getElementsByClassName('button-increase');
const decreaseButtonElements = document.getElementsByClassName('button-decrease');

for(const e of increaseButtonElements) {
  e.addEventListener('click', async () => {
    const productId = e.dataset.productid
    const response = await fetch(`/product/amount/increase/${productId}`, {method: 'PUT'})
    const json = await response.json()

    const amount = json.amount
    const unit = json.unit
    
    const storagePElement = Array.from(document.getElementsByClassName('storage'))
      .filter((e) => e.dataset.productid === productId)[0]
    storagePElement.innerHTML = `På lager: ${amount} ${unit}`
  })
}

for(const e of decreaseButtonElements) {
  e.addEventListener('click', async () => {
    const productId = e.dataset.productid
    const response = await fetch(`/product/amount/decrease/${productId}`, {method: 'PUT'})
    const json = await response.json()

    const amount = json.amount
    const unit = json.unit
    
    const storagePElement = Array.from(document.getElementsByClassName('storage'))
      .filter((e) => e.dataset.productid === productId)[0]
    storagePElement.innerHTML = `På lager: ${amount} ${unit}`
  })
}
//  ------- create product ----------
//const createProductElement = document.getElementByClassName("create-product");
// få knappen til at printe

// const productCarsElements = document.getElementsByClassName('product-container')

// for(const productCarsElement of productCarsElements){
//     productCarsElement.addEventListener("click", () => {
//       const valgteBilerElements = document.getElementsByClassName('product-container-selected')

//       for(const valgteBilerElement of valgteBilerElements){
//         valgteBilerElement.className = 'product-container'
//       }

//       if("product-container" === productCarsElement.className){
//       productCarsElement.className = "product-container-selected"
//     } else {
//       productCarsElement.className = "product-container"
//     }
//     })
