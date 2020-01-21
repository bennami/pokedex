//things we need from html
let pokeIcon = document.querySelector('.pokeIcon');
let pokeName = document.querySelector('.pokeName');
const pokeDescription = document.querySelector('.description');
const poeMoves = document.querySelector('.movesList');
const evolutionIcon = document.querySelector('.evolutionIcon');
let evolutionName = document.querySelector('.evolutionName');

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
const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);


//convert to json
const pObject =  await response1.json();
const pSpecies =   await response2.json();

//get pre evolutioon name
let preEvolutionP = pSpecies.evolves_from_species.name;
let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvolutionP}`);
let pEvolution = await res.json();

evolutionIcon.src = pEvolution.sprites.front_default;
evolutionName.innerHTML = preEvolutionP;

//get Poke data
let id = pObject.id;
let types = pObject.types.map((type) => type.type.name).join(', ');
pokeIcon.src = pObject.sprites.front_default;
pokeDescription.innerHTML = pSpecies.flavor_text_entries[2].flavor_text;

//get all moves in array
let moves=[];
  for(i=0; i< pObject.moves.length;i++){

    let allMoves = pObject.moves[i].move.name;
    moves.push(allMoves);

  }
//filter out 4 random moves
 for(i=0;i<4;i++){
 var randomItem = moves[Math.floor(Math.random()*moves.length)];
 }
 console.log(randomItem);



}




