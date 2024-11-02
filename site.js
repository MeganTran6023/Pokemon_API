//practice with first pokemon by id
const pokemonCount = 300;
var pokedex = {};


window.onload = async function name() {
    // getPokemon(1);
    //get all pokemon names to console
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

    //place all pokemon names on right side
    let pokemon = document.createElement("div");
    pokemon.id = i;
    //Format: "1. Pokemon Name"
    pokemon.innerText = i.toString() + "." + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    //identify if click in right scroll name list
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);

    }

    console.log(pokedex);
    
}

//fetch pokemon info API - check in console inspect element
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};

}

//function to update sprite when click on different pokemon character name
function updatePokemon() {
    let pokemonData = pokedex[this.id];
    let pokemonImg = document.getElementById("pokemon-img");

    // Remove 'fade-in' class to reset the animation
    pokemonImg.classList.remove("fade-in");

    // Wait for the new image to load before applying animation
    pokemonImg.onload = () => {
        pokemonImg.classList.add("fade-in");
    };

    // Update the image source
    pokemonImg.src = pokemonData.img;

    //POKEMON TYPES
    //clear type of prev pokemon
    // let typesDiv = document.getElementById("pokemon-types");
    // while (typesDiv.firstChild) {
    //     typesDiv.firstChild.remove();

    // //update type of pokemon
// Get the container where the types are displayed
let typesDiv = document.getElementById("pokemon-types");

// Clear the previous types to avoid duplicates
typesDiv.innerHTML = "";

// Get the types for the current Pokémon
let types = pokedex[this.id]["types"];

// Loop through the types and create elements for each
for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box", types[i]["type"]["name"]); // Adds background and font color if match with css class

    // Append the new type to the container
    typesDiv.appendChild(type);
}

//update pokemon description
let pokemonData2 = pokedex[this.id];
if (pokemonData2.desc) {
  document.getElementById("pokemon-description").innerText = pokemonData2.desc;
} else {
  // Display a message if description is not available
  document.getElementById("pokemon-description").innerText = "Description not available yet.";
}
}
