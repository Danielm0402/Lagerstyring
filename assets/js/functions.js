// import { getDataFromFirestore } from "./Firestore.js";

document.getElementById('addButton')

function x() {
  const addButton = document.getElementById('addButton')
  addButton.addEventListener("click", () => {
    console.log("Hej");
  })
}

const deleteButtonElements = document.getElementsByClassName('delete-button')

for (const e of deleteButtonElements) {
  e.addEventListener("click", () => {
    const productboksediv = e.parentElement.parentElement 
    productboksediv.remove()
  })
}

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






