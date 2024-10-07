function renderPokemonTemplate(pokemonObject, secondtype) {
    return /*html*/ `
        <div class="smallPokemonCard">   
        <div class="topBarCard"> 
            <span class="hp">HP: ${pokemonObject.stats[0].base_stat}</span>
            <span class="id">ID NR: ${pokemonObject.id}</span>
        </div> 
        <div class="displayNameCard"> 
           <span class="name">${pokemonObject.name.toUpperCase()}</span> 
            <img src="${pokemonObject.sprites.other["official-artwork"].front_default}"# />
        </div>
        <div class="showTypes">
            ${secondtype} 
        </div>
        <div class="bottomPartCard">
            <span class="weight">Weight: ${pokemonObject.weight} hg</span>
        </div>
    </div>
     `
}