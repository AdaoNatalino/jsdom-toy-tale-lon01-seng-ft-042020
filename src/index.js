let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getAllToys();
  createToy();
});

const urlToys = 'http://localhost:3000/toys'

function getAllToys() {
return fetch(urlToys)
.then(resp => resp.json())
.then(toysArray => showToys(toysArray))
.catch(error => console.log(error))};

function showToys(toysArray) {
  toysArray.forEach(toy => {
    addDiv(toy);
  });
  
}

function createDiv(toy) {
  const div = document.createElement('div');
  div.className = "card";
  const header = document.createElement('h2');
  header.innerText = toy.name;
  const img = document.createElement('img');
  img.className = "toy-avatar"; 
  img.src = toy.image;
  const p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;  
  const button = document.createElement('button');
  button.className = "like-btn";
  button.innerText = "Like";
  div.append(header);
  div.append(img);
  div.append(p);
  div.append(button);

  button.addEventListener('click', (e) => upLikes(e, toy));
  return div
}


function addDiv(toy) {
  const toyCollection = document.getElementById('toy-collection')
  const div = createDiv(toy);
  toyCollection.append(div);
}

function createToy() {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let toyObject = {
    name: e.target[0].value,
    image: e.target[1].value
    };
    
    let configObject = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(toyObject)
    };
    form.reset();

    fetch(urlToys, configObject)
    .then(resp => resp.json())
    .then(data => addDiv(data))
    .catch(error => console.log(error));
  })
}

function upLikes(e, toy) {
  e.preventDefault();
  // debugger
  let object = {
  likes: toy.likes + 1
  };
  
  let configObject = {
  method: 'PATCH',
  headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
  },
  body: JSON.stringify(object)
  };

  fetch(`${urlToys}/${toy.id}`, configObject)
  .then(resp => resp.json())
  .then(function(){
    let newLikes = parseInt(e.target.previousSibling.innerText); ; 
    e.target.previousSibling.innerText =  `${++ newLikes} Likes`;
  })
  .catch(error => console.log(error));
};



