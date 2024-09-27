/**
 * Fetches a list of Pokémon from the Pokedex API and renders them.
 * The function fetches Pokémon in batches defined by `PokemonLimit` and `PokemonOffset`.
 * It stops fetching when it reaches `PokemonMax`.
 * @returns {Promise<void>}
 */
async function getPokemonList() { }

/**
 * Renders a Pokémon object to the DOM.
 * @param {Object} pokemonObject - The Pokémon object to render.
 * @param {string} pokemonObject.name - The name of the Pokémon.
 * @param {Object} pokemonObject.sprites - The sprites object containing image URLs.
 * @param {Object} pokemonObject.sprites.other - The other sprites object.
 * @param {Object} pokemonObject.sprites.other.showdown - The showdown sprites object.
 * @param {string} pokemonObject.sprites.other.showdown.front_default - The URL of the Pokémon's front default sprite.
 */
function renderPokemon(pokemonObject) {

}

/**
 * Loads more Pokémon by fetching the next batch from the Pokedex API.
 */
const P = new Pokedex.Pokedex()
let PokemonLimit = 10;
let PokemonOffset = 1;
let PokemonMax = 151;
let PokemonObject = '';

function init() {
    getPokemonList();
    const searchInput = document.querySelector('input[type="search"]');
}

/**
 * Fetches a list of Pokémon and renders them.
 * 
 * This function iterates from the current `PokemonOffset` to `PokemonLimit`, fetching each Pokémon by its name
 * and rendering it. If the current index exceeds `PokemonMax`, the function returns early. After processing,
 * `PokemonLimit` is incremented by 12.
 * 
 * @async
 * @function getPokemonList
 * @returns {Promise<void>} A promise that resolves when the Pokémon list has been fetched and rendered.
 */


async function getPokemonList() {
    for (let i = PokemonOffset; i <= PokemonLimit; i++) {
        if (i <= PokemonMax) {
            const pokemon = await P.getPokemonByName(i);
            console.log(pokemon);
            renderPokemon(pokemon);
            PokemonOffset++;
        }
        else {
            return;
        }
    }
    PokemonLimit += 10;
}

/**
 * Renders a Pokémon object into the HTML list.
 * 
 * @param {Object} pokemonObject - The Pokémon object to render.
 * @param {string} pokemonObject.name - The name of the Pokémon.
 * @param {Object} pokemonObject.sprites - The sprites object containing image URLs.
 * @param {Object} pokemonObject.sprites.other - The other sprites object.
 * @param {Object} pokemonObject.sprites.other.showdown - The showdown sprites object.
 * @param {string} pokemonObject.sprites.other.showdown.front_default - The URL of the Pokémon's front image.
 */

function renderPokemon(pokemonObject) {
    const listContainer = document.getElementById('pokemon-list');

    // Create the container for the entire Pokémon card
    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon-card'); // Add a class for styling

    const pokemonType = pokemonObject.types[0].type.name;
    setContainerBackgroundByType(pokemonContainer, pokemonType);
    let secondtype = '';
    for (let i = 0; i < pokemonObject.types.length; i++) {
        secondtype += `<p>Type: ${pokemonObject.types[i].type.name}</p>`;
    }
    pokemonContainer.innerHTML = /*html*/`
    <div class="smallPokemonCard">   
        <div class="topBarCard"> 
            <span class="hp">HP: ${pokemonObject.stats[0].base_stat}</span>
            <span class="id">ID NR: ${pokemonObject.id}</span>
        </div> 
        <div class="displayNameCard"> 
           <span class="name">${pokemonObject.name.toUpperCase()}</span> 
            <img src="${pokemonObject.sprites.other.showdown.front_default}" />
        </div>
        <div class="showTypes">
            ${secondtype} 
        </div>
        <div class="bottomPartCard">
            <span class="weight">Weight: ${pokemonObject.weight} kg</span>
        </div>
    </div>`;
    listContainer.appendChild(pokemonContainer);
}





function setContainerBackgroundByType(container, pokemonType) {
    switch (pokemonType.toLowerCase()) {
        case 'water':
            container.style.backgroundColor = 'rgb(81, 168, 255)';
            break;
        case 'fire':
            container.style.backgroundColor = 'rgb(255, 96, 67)';
            break;
        case 'grass':
            container.style.backgroundColor = 'rgb(139, 212, 110)';
            break;
        case 'electric':
            container.style.backgroundColor = 'rgb(255, 212, 81)';
            break;
        case 'psychic':
            container.style.backgroundColor = 'rgb(255, 110, 168)';
            break;
        case 'rock':
            container.style.backgroundColor = 'rgb(197, 183, 125)';
            break;
        case 'ice':
            container.style.backgroundColor = 'rgb(125, 212, 255)';
            break;
        case 'dragon':
            container.style.backgroundColor = 'rgb(139, 125, 241)';
            break;
        case 'ghost':
            container.style.backgroundColor = 'rgb(125, 125, 197)';
            break;
        case 'bug':
            container.style.backgroundColor = 'rgb(183, 197, 67)';
            break;
        case 'poison':
            container.style.backgroundColor = 'rgb(183, 110, 168)';
            break;
        case 'normal':
            container.style.backgroundColor = 'rgb(183, 183, 168)';
        case 'flying':
            container.style.backgroundColor = 'rgb(154, 168, 255)';
            break;
        case 'fighting':
            container.style.backgroundColor = 'rgb(197, 110, 96)';
            break;
        case 'ground':
            container.style.backgroundColor = 'rgb(226, 197, 110)';
            break
        case 'rock':
            container.style.backgroundColor = 'rgb(197, 183, 125)';
            break
        case 'dark':
            container.style.backgroundColor = 'rgb(139, 110, 96)';
            break
        case 'steel':
            container.style.backgroundColor = 'rgb(183, 183, 197)';
            break
        case 'fairy':
            container.style.backgroundColor = 'rgb(241, 168, 241)';
            break;
    }
}



async function searchPokemon(query) {
    console.log('Suchbegriff:', query);
    if (query.length >= 3) {
        try {
            const pokemon = await P.getPokemonByName(query.toLowerCase());
            document.getElementById('pokemon-list').innerHTML = '';
            renderPokemon(pokemon);
        } catch (error) {
            console.error('Fehler beim Laden des Pokémon:', error);
            document.getElementById('pokemon-list').innerHTML = '<p>Pokémon nicht gefunden</p>';
        }
    } else {
        document.getElementById('pokemon-list').innerHTML = '<p>Bitte mindestens 3 Buchstaben eingeben</p>';
    }
}
