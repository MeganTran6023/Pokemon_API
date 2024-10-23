//practice with first pokemon by id
const pokemonCount = 151;
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

}
