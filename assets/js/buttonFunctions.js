document.getElementById("addButton");

function x() {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    console.log("Hej");
  });
}

const deleteButtonElements = document.getElementsByClassName("delete-button");
for (const e of deleteButtonElements) {
  const productId = e.dataset.productid;
  e.addEventListener("click", async () => {
    const response = await fetch(`/deleteProduct/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const productboksediv = e.parentElement.parentElement;
    productboksediv.remove();
  });
}

if (document.getElementById("delete-van")) {
  // på forsiden er der ikke noget der hedder delete-van, 
  // så der fejler den, hvis ikke der lige et et tjek på 
  // om der findes en "delete-van" på den side man er på.
  const deleteVanButtonElement = document.getElementById("delete-van");

  deleteVanButtonElement.addEventListener("click", async () => {
    const selectElement = document.querySelector("#dropdown-select-van");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let licensePlate = selectedOption.value;
    console.log("hey", licensePlate);

    // licensePlate = await selectedOption.value;

    const response = await fetch(`/deleteVan/${licensePlate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  });
}

if (document.getElementById("delete-electrician")) {
  const deleteElectricianButtonElement = document.getElementById("delete-electrician");

  deleteElectricianButtonElement.addEventListener("click", async () => {
    const selectElement = document.querySelector("#dropdown-select-electrician");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let employeeId = selectedOption.value;

    const response = await fetch(`/deleteElectrician/${employeeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    location.reload()
  })
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

if(plusminButtonElements) {

  for (const e of plusminButtonElements) {
    const productId = e.dataset.productid;
    const btnAction = e.dataset.action;
  
    e.addEventListener("click", async () => {
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
}

//-------------------------Create lagerbil------------------------------------------------
// const createVanBtn = document.getElementsByClassName("button-createVan")[0];

// createVanBtn.addEventListener("click", async () => {
//   const licensePlateElement = document.getElementsByClassName(
//     "input-vanLicensePlate"
//   )[0];
//   const vanOwnerElement = document.getElementsByClassName("input-vanOwner")[0];

//   const licensePlate = licensePlateElement.value;
//   const owner = vanOwnerElement.value;

//   console.log(licensePlate)
//   console.log(owner)

//   await fetch(`/van/${licensePlate}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ licensePlate, owner }),
//   });
// });

//------------------------------- SELECT VAN-----------------------------------------------
const selectVanDropdownElement = document.getElementById("dropdown-select-van");
const createProductLinkElement = document.getElementById("anchor-create-product");

if (selectVanDropdownElement) {

  selectVanDropdownElement.addEventListener('change', async () => {
    const selectedIndex = selectVanDropdownElement.selectedIndex;
    const selectedLicensePlateId = selectVanDropdownElement.options[selectedIndex].id
    const selectedLicensePlate = selectedLicensePlateId.split('-')[1]
    createProductLinkElement.href = `/createProduct/${selectedLicensePlate}`
    const vanProducts = await fetch(`/van/${selectedLicensePlate}/products`, {
      method: "GET",
    })
  });
}
