document.getElementById("addButton");

function x() {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    console.log("Hej");
  });
}


function deleteProductButton() {

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
}

function deleteVanButton() {

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
}

function deleteElectricianButton() {

if (document.getElementById("delete-user")) {
  const deleteUserButtonElement = document.getElementById("delete-user");

  deleteUserButtonElement.addEventListener("click", async () => {
    const selectElement = document.querySelector("#dropdown-select-user");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let employeeId = selectedOption.value;

    const response = await fetch(`/deleteUser/${employeeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    location.reload()
  })
}
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
function plusMinButtons() {

  const plusminButtonElements = document.getElementsByClassName("button-plusmin");
  
  if (plusminButtonElements) {
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

function selectVanDropdown() {

  const selectVanDropdownElement = document.getElementById("dropdown-select-van");
  
  if (selectVanDropdownElement) {
    selectVanDropdownElement.addEventListener("change", async () => {
      const selectedIndex = selectVanDropdownElement.selectedIndex;
      const selectedLicensePlateId = selectVanDropdownElement.options[selectedIndex].id
      if (selectedLicensePlateId === 'option-show-all') {
        updateHtmlProducts(data.products)

      } else {
        
        const selectedLicensePlate = selectedLicensePlateId.split('-')[1]
  
  
        let response  = await fetch(`/van/${selectedLicensePlate}/products`, {
          method: "POST",
        });
        const vanProducts = await response.json();
        updateHtmlProducts(vanProducts)
      }
    });
  }
}

function updateHtmlProducts(products) {
  const productContainerElement = document.getElementById('container-products');

  productContainerElement.innerHTML = '';
  for (const product of products) {
    productContainerElement.innerHTML 
      += `  
        <div class="product-container">
          <p>${product.name}</p>
          <p class="storage-p" data-productid="${product.productId}">På lager: ${product.amount} ${product.unit}</p>
          <div class="buttons-trash-and-plusmin">
            <button class="delete-button" type="button" data-productid="${product.productId}" id="button-delete-product">
              <ion-icon name="trash-outline" role="img" class="md hydrated"></ion-icon>
            </button>
            <div class="buttons-plus-minus">
              <button class="button-plusmin" type="button" data-productid="${product.productId}" data-action="increase">
                <ion-icon name="add-circle-outline" role="img" class="md hydrated"></ion-icon>
              </button>
              <button class="button-plusmin" type="button" data-productid="${product.productId}" data-action="decrease">
                <ion-icon name="remove-circle-outline" role="img" class="md hydrated"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        `
  }

}

function lockVans() {
    const user = data.user;
    const userVans = user.vans;
  
    if (userVans.length > 0 && !(user.role === 'admin')) {
      const dropDownElement = document.getElementById('dropdown-select-van');
      const options = dropDownElement.options

      for(const o of options) {
        let id = o.id.split('-')[1];
        console.log(o)
        if (!(id === userVans[0])) {
          o.disabled = "true"
          o.selected = "false"
        } else {
          o.selected = "true"
        }
      }
      deleteElectricianButton();
      plusMinButtons();
  }
}



function initFunctions() {

  lockVans();

  deleteProductButton();
  deleteVanButton();
  deleteElectricianButton();

  plusMinButtons();
  selectVanDropdown();

}

initFunctions()