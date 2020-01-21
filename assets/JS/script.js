//things we need from html
const pokeIcon = document.querySelector('pokIcon');
const pokeName = document.querySelector('pokName');
const pokeDescription = document.querySelector('description');
const poeMoves = document.querySelector('movesList');
const evolutionIcon = document.querySelector('evolutionIcon');
const evolutionName = document.querySelector('evolutionName');

//click event
document.getElementById('inputBtn').addEventListener('click', function getName(){

 //get input name
 let inputName = document.getElementById('input').value;

//invoke function to fetch JSON with input name as parameter
 getData(inputName);

});

//fetch JSON
async function getData(name) {

//fetch stream of data
const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

//convert to json
const pObject =  await response1.json();
const pSpecies =   await response2.json();

console.log(pObject);
console.log(pSpecies);
}
