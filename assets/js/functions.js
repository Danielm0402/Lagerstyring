
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
    const vareboksediv = e.parentElement.parentElement 
    vareboksediv.remove()
  })

}


// const varebilerElements = document.getElementsByClassName('varebokse')

// for(const varebilerElement of varebilerElements){
//     varebilerElement.addEventListener("click", () => {
//       const valgteBilerElements = document.getElementsByClassName('varebokse-valgt')

//       for(const valgteBilerElement of valgteBilerElements){
//         valgteBilerElement.className = 'varebokse'
//       }

//       if("varebokse" === varebilerElement.className){
//       varebilerElement.className = "varebokse-valgt"
//     } else {
//       varebilerElement.className = "varebokse"
//     }
//     })






