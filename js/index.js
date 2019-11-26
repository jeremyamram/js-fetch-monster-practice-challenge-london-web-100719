const nameInput = document.createElement("input");
nameInput.placeholder = "name...";
const ageInput = document.createElement("input");
ageInput.placeholder = "age...";
const descriptionInput = document.createElement("input");
descriptionInput.placeholder = "description...";
const createButton = document.createElement("button")
createButton.innerText = "Create";
const form = document.createElement("form");
form.appendChild(nameInput);
form.appendChild(ageInput);
form.appendChild(descriptionInput);
form.appendChild(createButton);
const divForm = document.getElementById("create-monster");
divForm.appendChild(form);
const divMain = document.getElementById("monster-container");

const parameters = {
    limit: 50,
    page: 1
}

const forwardButton = document.getElementById("forward");
const backButton = document.getElementById("back");

forwardButton.addEventListener("click", (event)=>{
    while (divMain.firstChild) {
        divMain.removeChild(divMain.firstChild);
      }
    parameters.page = parameters.page + 1;
    fetchMonsters();
})

backButton.addEventListener("click", (event)=>{
    if(parameters.page > 0){
        parameters.page = parameters.page - 1;
        while (divMain.firstChild) {
            divMain.removeChild(divMain.firstChild);
          }
        fetchMonsters();
}})

function fetchMonsters (){
fetch(`http://localhost:3000/monsters/?_limit=${parameters.limit}&_page=${parameters.page}`)
.then(function(response) {
    return response.json();
}).then(function(result){
    renderPage(result);
})}

fetchMonsters();


    
function renderPage(monsters){
    monsters.forEach(monster => {
       console.log(monster.name)
    const header = document.createElement("h1");
    const smallHeader = document.createElement("h3");
    const paragraph = document.createElement("p");
    header.innerText = monster.name;
    smallHeader.innerText = `Age: ${monster.age}`;
    paragraph.innerText = `Bio: ${monster.description}`;
    divMain.appendChild(header);
    divMain.appendChild(smallHeader);
    divMain.appendChild(paragraph);

});

}

form.addEventListener("submit", (event)=>{
event.preventDefault();
let formData = {
    name: nameInput.value,
    age: ageInput.value,
    description: descriptionInput.value
  };
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  fetch("http://localhost:3000/monsters", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    });
  
})

