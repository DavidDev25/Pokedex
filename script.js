async function getPokemonList() { }


function loadMorePokemon() {
    getPokemonList();
}

const P = new Pokedex.Pokedex()
let PokemonLimit = 10;
let PokemonOffset = 1;
let PokemonMax = 151;
let PokemonObject = '';

function init() {
    showSpinner();
    getPokemonList();
}


async function getPokemonList() {
    showSpinner();
    for (let i = PokemonOffset; i <= PokemonLimit; i++) {
        if (i <= PokemonMax) {
            const pokemon = await P.getPokemonByName(i);
            console.log(pokemon);
            renderPokemon(pokemon);
            PokemonOffset++;
        } else {
            return;
        }
    }
    hideSpinner();
    PokemonLimit += 10;
}

function renderPokemon(pokemonObject) {
    const listContainer = document.getElementById('pokemon-list');
    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon-card');
    const pokemonType = pokemonObject.types[0].type.name;
    setContainerBackgroundByType(pokemonContainer, pokemonType);
    let secondtype = '';
    for (let i = 0; i < pokemonObject.types.length; i++) {
        secondtype += `<p>Type: ${pokemonObject.types[i].type.name}</p>`;
    }
    pokemonContainer.innerHTML = renderPokemonTemplate(pokemonObject, secondtype);
    listContainer.appendChild(pokemonContainer);
}


function searchForPokemon(PokemonObject) {
    return PokemonObject >= 10;
}


function closeModal() {
    const modal = document.getElementById('modal')
    modal.style.display = 'none';
}


function setContainerBackgroundByType(container, pokemonType) {
    switch (pokemonType.toLowerCase()) {
        case 'water':
            container.style.backgroundColor = 'rgba(81, 168, 255,0.7)';
            break;
        case 'fire':
            container.style.backgroundColor = 'rgba(255, 96, 67, 0.7)';
            break;
        case 'grass':
            container.style.backgroundColor = 'rgba(139, 212, 110, 0.8)';
            break;
        case 'electric':
            container.style.backgroundColor = 'rgba(255, 212, 81, 0.8)';
            break;
        case 'psychic':
            container.style.backgroundColor = 'rgba(255, 110, 168,0.7)';
            break;
        case 'rock':
            container.style.backgroundColor = 'rgba(197, 183, 125,0.7)';
            break;
        case 'ice':
            container.style.backgroundColor = 'rgba(125, 212, 255,0.7)';
            break;
        case 'dragon':
            container.style.backgroundColor = 'rgba(139, 125, 241,0.7)';
            break;
        case 'ghost':
            container.style.backgroundColor = 'rgba(125, 125, 197,0.7)';
            break;
        case 'bug':
            container.style.backgroundColor = 'rgba(183, 197, 67,0.7)';
            break;
        case 'poison':
            container.style.backgroundColor = 'rgba(183, 110, 168,0.7)';
            break;
        case 'normal':
            container.style.backgroundColor = 'rgba(187, 187, 170, 0.7)';
            break;
        case 'flying':
            container.style.backgroundColor = 'rgba(154, 168, 255,0,7)';
            break;
        case 'fighting':
            container.style.backgroundColor = 'rgba(197, 110, 96, 0.7)';
            break;
        case 'ground':
            container.style.backgroundColor = 'rgba(226, 197, 110,0.7)';
            break
        case 'rock':
            container.style.backgroundColor = 'rgba(197, 183, 125,0.7)';
            break
        case 'dark':
            container.style.backgroundColor = 'rgba(139, 110, 96,0.7)';
            break
        case 'steel':
            container.style.backgroundColor = 'rgba(183, 183, 197,0.7)';
            break
        case 'fairy':
            container.style.backgroundColor = 'rgba(241, 168, 241,0.7)';
            break;
    }
}


function showSpinner() {
    let preLoaderDiv = document.getElementById("preSpinner");
    if (preLoaderDiv) {
        preLoaderDiv.style.display = 'block';
    }
}

function hideSpinner() {
    let preLoaderDiv = document.getElementById("preSpinner");
    preLoaderDiv.style.display = 'none';
}
