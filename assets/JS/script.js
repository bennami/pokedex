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
    function setMoves() {
//get all moves into an array
        for (i = 0; i < pObject.moves.length; i++) {
            let allMoves = pObject.moves[i].move.name;
            moves.push(allMoves);

        }
    }
    setMoves();
    console.log(moves);

 //randomize moves array. pass array into random function
let shuffle = function random(moves){
    let movesRandom,
        temp;

    //this will exchange values of array
    //iterate through array backwards
    for( let i = moves.length -1; i>0 ; i-- ){
         movesRandom = Math.floor( Math.random() * (i+1));
         temp = moves[i];
         moves[i]= moves[movesRandom];
         moves[movesRandom] = temp;

         }

         return moves;

         };
        let shuffledMoves = shuffle(moves);
        console.log(shuffledMoves);
        let moves4 =moves.slice(0,4);
    console.log(moves4);

// generate <li> for every string and append to <ul>
for( let i=0; i<moves4.length; i++){

    let node = document.createElement("li");
    // Create a <li> node
    let textnode = document.createTextNode(moves4[i]);
    // Create a text node
    node.appendChild(textnode);
    // Append the text to <li>
    document.getElementById("movesList").appendChild(node);
    // Append <li> to <ul> 
}



}





