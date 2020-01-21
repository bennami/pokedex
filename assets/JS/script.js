//things we need from html
let pokeIcon = document.querySelector('.pokeIcon');
let pokeName = document.querySelector('.pokeName');
const pokeDescription = document.querySelector('.description');
const poeMoves = document.querySelector('.movesList');
const evolutionIcon = document.querySelector('.evolutionIcon');
const evolutionName = document.querySelector('.evolutionName');

//click event
document.getElementById('inputBtn').addEventListener('click', function getName(){

 let inputName = document.getElementById('input').value;
//invoke function to fetch JSON with input name as parameter
 getPokemon(inputName);
//put name back on html
pokeName.innerHTML = inputName;
});
//fetch JSON
async function getPokemon(name) {

//fetch stream of data
const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

//convert to json
const pObject =  await response1.json();
const pSpecies =   await response2.json();

//get Poke icon
let URL = pObject.sprites.front_default;
let id = pObject.id;
let types =pObject.types.map((type) => type.type.name).join(', ');
pokeIcon.src = URL;
console.log(pObject);
console.log(pSpecies);
console.log(types);

}



