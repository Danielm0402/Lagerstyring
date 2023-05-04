import Controller from "../controllers/controller";

const controller = new Controller();

const createVanBtn = document.getElementsByClassName("button-createVan")[0];

createVanBtn.addEventListener("click", async () => {
  const licensePlateElement = document.getElementsByClassName(
    "input-vanLicensePlate"
  )[0];
  const vanOwnerElement = document.getElementsByClassName("input-vanOwner")[0];

  const licensePlate = licensePlateElement.value;
  const owner = vanOwnerElement.value;

  const createdVan = controller.createVan(licensePlate, owner);
  await fetch(`/van/${createdVan.licensePlate}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ van: createdVan }),
  });
});