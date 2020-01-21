//get Input
let INPUTNAME;
document.getElementById('inputBtn').addEventListener('click', function getName(){
  INPUTNAME = document.getElementById('input').value;
    console.log(INPUTNAME);
});



//fetch JSON
async function getData() {


//fetch stream of data
const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

//convert to json
const pObject =  await response1.json();
const pSpecies =   await response2.json();

console.log(pObject);
console.log(pSpecies);
}

getData();