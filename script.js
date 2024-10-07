async function getPokemonList() { }

function loadMorePokemon() {
    getPokemonList();
}

const P = new Pokedex.Pokedex()
let PokemonLimit = 10;
let PokemonOffset = 1;
let PokemonMax = 151;
let PokemonObject = '';
let pokemonList = [];

function init() {
    showSpinner();
    getPokemonList();

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', searchForPokemon);
}

async function getPokemonList() {
    showSpinner();
    for (let i = PokemonOffset; i <= PokemonLimit; i++) {
        if (i <= PokemonMax) {
            const pokemon = await P.getPokemonByName(i);
            pokemonList.push(pokemon)
            renderPokemon(pokemon);
            PokemonOffset++;
        } else {
            return;
        }
    }
    if (PokemonLimit == 150) PokemonLimit += 1;
    if (PokemonLimit < 150) PokemonLimit += 20;
    hideSpinner();
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
    pokemonContainer.addEventListener('click', function () {
        showPokemonModal(pokemonObject);
    });

    listContainer.appendChild(pokemonContainer);
}

function showPokemonModal(pokemonObject) {
    currentPokemonIndex = pokemonList.findIndex(p => p.id === pokemonObject.id);
    const modal = document.getElementById('pokemonModal');
    const largePokemonCard = document.getElementById('largePokemonCard');

    largePokemonCard.innerHTML = `
        <div class="largePokemonCard">
            <h2>${pokemonObject.name.toUpperCase()}</h2>
            <img src="${pokemonObject.sprites.other['official-artwork'].front_default}" alt="${pokemonObject.name}">
            <p>HP: ${pokemonObject.stats[0].base_stat}</p>
            <p>ID: ${pokemonObject.id}</p>
            <p>Weight: ${pokemonObject.weight} hg</p>
            ${pokemonObject.types.map(type => `<p>Type: ${type.type.name}</p>`).join('')}
            <a class="prev" onclick="changeImage(-1)">&#8656;</a>
            <a class="next" onclick="changeImage(1)">&#8658;</a>
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = 'hidden';

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}



function changeImage(direction) {
    currentPokemonIndex += direction;
    if (currentPokemonIndex < 0) {
        currentPokemonIndex = pokemonList.length - 1;
    }
    else if (currentPokemonIndex >= pokemonList.length) {
        currentPokemonIndex = 0;
    }
    const nextPokemon = pokemonList[currentPokemonIndex];
    showPokemonModal(nextPokemon);

}

function searchForPokemon() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const listContainer = document.getElementById('pokemon-list');

    listContainer.innerHTML = '';

    if (searchInput.length >= 3) {
        const filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
        https://www.allbytes.de/blog/javascript-foreach/#:~:text=Was%20ist%20forEach%3F,Aktion%20f%C3%BCr%20jedes%20Element%20auszuf%C3%BChren.
        filteredPokemon.forEach(pokemon => {
            renderPokemon(pokemon);
        });
    } else {
        pokemonList.forEach(pokemon => {
            renderPokemon(pokemon);
        });
    }
}


function closeModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
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
        preLoaderDiv.style.display = 'flex';
    }
}

function hideSpinner() {
    let preLoaderDiv = document.getElementById("preSpinner");
    preLoaderDiv.style.display = 'none';
}
