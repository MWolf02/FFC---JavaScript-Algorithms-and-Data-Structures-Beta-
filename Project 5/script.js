document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-button");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonWeight = document.getElementById("weight");
  const pokemonHeight = document.getElementById("height");
  const pokemonTypes = document.getElementById("types");
  const pokemonHp = document.getElementById("hp");
  const pokemonAttack = document.getElementById("attack");
  const pokemonDefense = document.getElementById("defense");
  const pokemonSpecialAttack = document.getElementById("special-attack");
  const pokemonSpecialDefense = document.getElementById("special-defense");
  const pokemonSpeed = document.getElementById("speed");

  const displayPokemon = (pokemon) => {
    pokemonTypes.innerHTML = ""; // Clear previous types

    // Update the DOM elements with the fetched data
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonId.textContent = `#${pokemon.id}`;
    pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
    pokemonHeight.textContent = `Height: ${pokemon.height}`;

    // Stats are contained in an array; find each by name
    pokemonHp.textContent = pokemon.stats.find(
      (s) => s.stat.name === "hp"
    ).base_stat;
    pokemonAttack.textContent = pokemon.stats.find(
      (s) => s.stat.name === "attack"
    ).base_stat;
    pokemonDefense.textContent = pokemon.stats.find(
      (s) => s.stat.name === "defense"
    ).base_stat;
    pokemonSpecialAttack.textContent = pokemon.stats.find(
      (s) => s.stat.name === "special-attack"
    ).base_stat;
    pokemonSpecialDefense.textContent = pokemon.stats.find(
      (s) => s.stat.name === "special-defense"
    ).base_stat;
    pokemonSpeed.textContent = pokemon.stats.find(
      (s) => s.stat.name === "speed"
    ).base_stat;

    // Types can be multiple, so loop through them
    pokemon.types.forEach((type) => {
      const typeElement = document.createElement("span");
      typeElement.textContent = type.type.name.toUpperCase();
      typeElement.style.backgroundColor = "none";
      typeElement.style.marginRight = "6px";
      typeElement.style.fontWeight = "600";
      pokemonTypes.appendChild(typeElement);
    });

    let imgElement = document.getElementById("sprite");
    const spriteContainer = document.getElementById("sprite-container");

    if (!imgElement) {
      imgElement = document.createElement("img");
      imgElement.setAttribute("id", "sprite");
      spriteContainer.appendChild(imgElement);
    }

    // Set the src of the img element to the Pokémon's sprite URL
    imgElement.setAttribute("src", pokemon.sprites.front_default);
  };

  searchBtn.addEventListener("click", () => {
    const pokemonNameOrId = userInput.value.trim().toLowerCase();
    if (!pokemonNameOrId) return; // Do nothing if the input is empty

    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((pokemon) => {
        displayPokemon(pokemon); // Call with a single Pokémon object
      })
      .catch((err) => {
        console.error(`There was an error: ${err}`);
        alert("Pokémon not found"); // User-friendly error message
      });
  });
});
