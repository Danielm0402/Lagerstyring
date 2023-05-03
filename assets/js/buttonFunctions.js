import { test } from "../controllers/controller.js";
import Controller from "../../controllers/controller.js";

const controller = new Controller();

document.getElementById("addButton");

function x() {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    console.log("Hej");
  });
}

const createProductElement = document.getElementById("create-product-btn");

// createProductElement.addEventListener("click", async () => {
//   const formData = new FormData(document.querySelector("form"));
//   const product = {
//     "input-name": formData.get("input-name"),
//     "input-produkt-id": formData.get("input-produkt-id"),
//     "input-amount": formData.get("input-amount"),
//     "dropdown-unit": formData.get("dropdown-unit"),
//   };

//   const response = await fetch(`/productCreated`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(product),
//   });
// });

const deleteButtonElements = document.getElementsByClassName("delete-button");
for (const e of deleteButtonElements) {
  const productId = e.dataset.productid;
  e.addEventListener("click", async () => {
    const response = await fetch(`/deleteProduct/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify( {action: btnAction} )
    });

    const productboksediv = e.parentElement.parentElement;
    productboksediv.remove();
  });
}

// ----------- INCREASE/DECREASE PRODUCT AMOUNT -------------------------------------------------------------------

/*
Looper igennem alle increaseButtons 
og giver dem en eventlistener
Gem productId for at kunne opdatere
aktuelle product i db

send et request til serveren
hvor i body'en af requestet 
er en action property der 
fortæller serveren hvad den skal 
gøre med requestet
Responset fra requestet gemmes i en variabel

Find aktuelle paragraph element
ved at få alle elementer med 
klassen storage. Filtrer for dem
der har data productId

opdater dette paragraph elements
text, så det passer med det nye
antal products

*/
const plusminButtonElements = document.getElementsByClassName("button-plusmin");

for (const e of plusminButtonElements) {
  const productId = e.dataset.productid;
  const btnAction = e.dataset.action;

  e.addEventListener("click", async () => {
    console.log(JSON.stringify({ action: btnAction }));
    const response = await fetch(`/products/${productId}/amount`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: btnAction }),
    });

    const json = await response.json();

    const amount = json.amount;
    const unit = json.unit;

    const storagePElement = Array.from(
      document.getElementsByClassName("storage-p")
    ).filter((e) => e.dataset.productid === productId)[0];
    storagePElement.innerHTML = `På lager: ${amount} ${unit}`;
  });
}

//-------------------------Create lagerbil-------------------------------------------------

const createVanBtn = document.getElementsByClassName("button-createVan")[0];

createVanBtn.addEventListener("click", async () => {
  const licensePlateElement = document.getElementsByClassName(
    "input-vanLicensePlate"
  )[0];
  const vanOwnerElement = document.getElementsByClassName("input-vanOwner")[0];

  const licensePlate = licensePlateElement.value;
  const owner = vanOwnerElement.value;

  const createdVan = controller.createVan(licensePlate, owner);
  await fetch(`/createvan/${createdVan.licensePlate}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ van: createdVan }),
  });
});