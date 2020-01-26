//things we need from html
let pokeIcon = document.querySelector('.pokeIcon');
let pokeName = document.querySelector('.pokeName');
let pokeDescription = document.querySelector('.description');
let evolutionIcon = document.querySelector('.evolutionIcon');
let evolutionName = document.querySelector('.evolutionName');
let evolutionDiv = document.querySelector('.EvolutionIcon');
let descriptionDiv = document.querySelector('.Descriptionbox');
let movesDiv = document.querySelector('.movesList');
let moves4=[];
pokeIcon.style.display='none';
evolutionIcon.style.display='none';
//click event
document.getElementById('inputBtn').addEventListener('click', function getName(){

//hide DOM elements that shouldnt be displayed and display the ones that should be displayed
evolutionDiv.style.display = 'none';
movesDiv.style.display = 'none';
pokeName.style.display='none';
pokeIcon.style.display='block';
descriptionDiv.style.display = 'block';
evolutionIcon.style.display='block';

//empty array every time you search for new pokemon
moves4.length=0;

//get input name on search
let inputName = document.getElementById('input').value;

//invoke function to fetch JSON with input name as parameter
getPokemon(inputName);
//put name back on html
    pokeName.innerHTML = inputName;
});

//fetch JSON
async function getPokemon(name) {

//if input is empty correct alert the user to retype
if(name === ""){
    alert('type in a pokemon name!')
}
//fetch stream of data
const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

//convert to json
const pObject =  await response1.json();
const pSpecies =   await response2.json();

    if( pSpecies.evolves_from_species === null){
        evolutionName.innerHTML = 'no previous evolution';
        evolutionIcon.style.display='none';

    }else{

        //get pre evolutioon name
        let preEvolutionP = pSpecies.evolves_from_species.name;
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvolutionP}`);
        let pEvolution = await res.json();

//get image evolution pokemon and set to DOM element
        evolutionIcon.src = pEvolution.sprites.front_default;
        evolutionName.innerHTML = preEvolutionP;
    }


//get Poke id, type, icon and description
let id = pObject.id;
let types = pObject.types.map((type) => type.type.name).join(', ');
pokeIcon.src = pObject.sprites.front_default;

// Loop through and get description that is english
for (x = 0; x < pSpecies.flavor_text_entries.length; x++) {
    if (pSpecies.flavor_text_entries[x].language.name === "en") {
                pokeDescription.innerHTML = pSpecies.flavor_text_entries[x].flavor_text;
        }
}

//get all moves in array
    let moves=[];
    function setMoves() {
        for (i = 0; i < pObject.moves.length; i++) {
            let allMoves = pObject.moves[i].move.name;
            moves.push(allMoves);
        }
    }
    setMoves();

 //randomize moves array. pass array into random function
let shuffle = function random(moves){
    let movesRandom,
        temp;
    //this will exchange values of array, iterate through array backwards
    for( let i = moves.length -1; i>0 ; i-- ){
         movesRandom = Math.floor( Math.random() * (i+1));
         temp = moves[i];
         moves[i]= moves[movesRandom];
         moves[movesRandom] = temp;
         }
         return moves;
         };
//slice list to get first four
moves4 = moves.slice(0,4);

//empty list after every new search
document.getElementById("movesList").innerHTML = " ";

// generate <li> for every string and append to <ul>
    for( let i=0; i< moves4.length; i++){
        let node = document.createElement("li");
        // Create a <li> node
        let textnode = document.createTextNode(moves4[i]);
        // Create a text node
        node.appendChild(textnode);
        // Append the text to <li>
        document.getElementById("movesList").appendChild(node);
    }

//toggle through info with buttons
let descriptionCount = 0;
document.getElementById('nextbtn').addEventListener('click', function (
    ) {
        if(descriptionCount === 0){
            descriptionCount++;
            descriptionDiv.style.display = 'none';
            evolutionDiv.style.display = 'none';
            movesDiv.style.display = 'block';
        }else if(descriptionCount === 1){
            descriptionCount++;
            descriptionDiv.style.display = 'none';
            evolutionDiv.style.display = 'block';
            movesDiv.style.display = 'none';
        }else {
            descriptionCount = 0;
            descriptionDiv.style.display = 'block';
            evolutionDiv.style.display = 'none';
            movesDiv.style.display = 'none';
        }
    });

    document.getElementById('previousbtn').addEventListener('click', function (
    ) {
        if(descriptionCount === 0){
            descriptionCount= 2;
            descriptionDiv.style.display = 'none';
            evolutionDiv.style.display = 'block';
            movesDiv.style.display = 'none';
        }else if(descriptionCount === 2){
            descriptionCount--;
            descriptionDiv.style.display = 'none';
            evolutionDiv.style.display = 'none';
            movesDiv.style.display = 'block';
        }else {
            descriptionCount --;
            descriptionDiv.style.display = 'block';
            evolutionDiv.style.display = 'none';
            movesDiv.style.display = 'none';
        }
    });


}





