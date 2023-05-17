

function createVanButton() {
  const createVanButtonElement = document.getElementById('button-create-van');
  const nrInputElement = document.getElementById('input-van-nr');
  const lpInputElement = document.getElementById('input-licensePlate');
  const errVanNrElement = document.getElementById('p-err-van-nr');
  const errLicensePlateElement = document.getElementById('p-err-licensePlate')

  const errNotANr = "Forkert input: Vognnummer skal være et tal."
  const errNot7Chars = "Forkert input: Registreringsnummer skal være 7 karakterer."
  const errNotCorrectFormat = "Forkert input: Registreringsnummer er ikke i korrekt format."

  createVanButtonElement.addEventListener("click", () => {
    //.split().join() er for at fjerne alle mellemrum i inputtet
    let inputError = false;
    const nrInputValue = parseInt(nrInputElement.value.trim());
    const lpInputValue = lpInputElement.value.split(' ').join('').toLowerCase();

    errVanNrElement.innerText = ""
    errLicensePlateElement.innerText = ""
    
    if (isNaN(nrInputValue)) {
      errVanNrElement.innerText += errNotANr + "\n"
      inputError = true;
    }
    if (lpInputValue.length !== 7) {
      errLicensePlateElement.innerText += errNot7Chars + "\n"
      inputError = true;
    }
    if (!checkLicensePlate(lpInputValue)) {
      errLicensePlateElement.innerText += errNotCorrectFormat + "\n";
      inputError = true;
    }

    if (!inputError) {
      const licensePlate = formatLicensePlate(lpInputValue);
      const vanNr = nrInputValue;


      fetch('/van', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({licensePlate: licensePlate, vanNumber: vanNr})
      })
    }
  })

}


function checkLicensePlate(licensePlate) {
  const lpSplits = splitLicensePlate(licensePlate);
  const regExLetters = /^[a-z]+$/
  const regExDigits = /^[0-9]+$/
  /*
    regular expression
    /^[a-z]+$/
    søger en streng igennem for det givne udtryk
    i dette tilfælde om den indeholder bogstaver fra a-z
    ^ - betyder at den leder i starten af strengen
    $ - betyder at den leder i slutningen af strengen
    når ^ og $ bliver brugt sammen betyder det at hele strengen skal matche udtrykket
    + - betyder at strengen kan være længere end 1
  */
  if (  !(regExLetters.test(lpSplits[0])) 
        || !(regExDigits.test(lpSplits[1]))
        || !(regExDigits.test(lpSplits[2])) ){

    return false;
  }

  return true;
}

function splitLicensePlate(licensePlate) {
  let splits = []

  const letters = licensePlate.substring(0, 2);
  const firstDigits = licensePlate.substring(2, 5);
  const lastDigits = licensePlate.substring(5);

  splits.push(letters);
  splits.push(firstDigits);
  splits.push(lastDigits);

  return splits;
}

function formatLicensePlate(licensePlate) {
  const splits = splitLicensePlate(licensePlate);

  const formattetLicensePlate = splits.join(' ')
  return formattetLicensePlate;
}

function initFunctions() {
  createVanButton();
}

initFunctions()