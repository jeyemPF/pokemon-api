document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);

    // Add Pokemon names to the search bar as options
    const pokemonNameInput = document.getElementById("pokemonName");
    pokemonNameInput.setAttribute("list", "pokemonList");
    
    const datalist = document.createElement("datalist");
    datalist.id = "pokemonList";
    pokemonNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        datalist.appendChild(option);
    });
    
    document.body.appendChild(datalist);
});

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Pokemon does not exist");
            } else {
                throw new Error("Could not fetch resource");
            }
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const abilities = data.abilities.map(ability => ability.ability.name);
        const types = data.types.map(type => type.type.name);
        const baseExperience = data.base_experience;
        const height = data.height;
        const weight = data.weight;
        const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);


        const cardElement = document.getElementById("pokemonCard");
        const imgElement = document.getElementById("pokemonSprite");
        const nameDisplayElement = document.getElementById("pokemonNameDisplay");
        const abilitiesElement = document.getElementById("pokemonAbilities");
        const typesElement = document.getElementById("pokemonTypes");
        const experienceElement = document.getElementById("pokemonExperience");
        const heightElement = document.getElementById("pokemonHeight");
        const weightElement = document.getElementById("pokemonWeight");
        const statsElement = document.getElementById("pokemonStats");

        imgElement.src = pokemonSprite;
        cardElement.style.display = "flex";  

        nameDisplayElement.textContent = `Name: ${data.name}`;
        abilitiesElement.textContent = `Abilities: ${abilities.join(", ")}`;
        typesElement.textContent = `Types: ${types.join(", ")}`;
        experienceElement.textContent = `Base Experience: ${baseExperience}`;
        heightElement.textContent = `Height: ${height} decimetres`;
        weightElement.textContent = `Weight: ${weight} hectograms`;
        statsElement.textContent = `Stats: ${stats.join(", ")}`;

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

