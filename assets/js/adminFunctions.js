
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
      location.reload();
    });
  }
}

function assignUserToVan(){
  const assignButton = document.getElementsByClassName("assign")[0]

  const selectVanDropdownElement = document.getElementById("dropdown-select-van");
  const selectUserDropdownElement = document.getElementById("dropdown-select-user");

  console.log(selectVanDropdownElement, selectUserDropdownElement);

  if(selectUserDropdownElement && selectVanDropdownElement){
    assignButton.addEventListener("click", async () =>{
      const selectedVanIndex = selectVanDropdownElement.selectedIndex
      const selectedVanLicensePlateId = selectVanDropdownElement.options[selectedVanIndex].id
      const selectedVanLicensePlate = selectedVanLicensePlateId.split('-')[1]

      const selectedUserIndex = selectUserDropdownElement.selectedIndex
      const selectedUserEmployeeIdId = selectUserDropdownElement.options[selectedUserIndex].id
      const selectedUserEmployeeId = selectedUserEmployeeIdId.split('-')[1]

      await fetch(`/updateVan/${selectedVanLicensePlate}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({licensePlate: selectedVanLicensePlate, employeeId: selectedUserEmployeeId}),
      })

      console.log(selectedVanLicensePlate, selectedUserEmployeeId)

      // updateVan(selectedVanLicensePlate, selectedUserEmployeeId)
      // updateUser(selectedUserEmployeeId, selectedVanLicensePlate)
      
    })
  }
}

function initFunctions() {
  deleteElectricianButton();
  deleteVanButton();
  assignUserToVan();

}

initFunctions();