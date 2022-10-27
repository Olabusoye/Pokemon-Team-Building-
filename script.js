/**
 * @type {{string}}
 */
const colours = {
    Bug: "yellow",
    Dark: "brown",
    Dragon: "purple",
    Electric: "yellow",
    Fairy: "pink",
    Fighting: "brown",
    Fire: "orange",
    Flying: "purple",
    Ghost: "purple",
    Grass: "green",
    Ground: "yellow",
    Ice: "lightblue",
    Normal: "beige",
    Poison: "purple",
    Psychic: "pink",
    Rock: "brown",
    Shadow: "purple",
    Steel: "grey",
    Water: "lightblue"
}

/**
 * @param {string} input
 * @returns {Promise<{name: string, image: string, types: string[]}>}
 */
async function getData(input) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = await response.json();

    const types = [];
    data.types.forEach(type => types.push(upperFirstChar(type.type.name)));
    return {
        name: upperFirstChar(data.name),
        image: data.sprites.front_default,
        types
    }
}

/**
 * @param {string} input
 * @returns {string}
 */
function upperFirstChar(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

const form = document.getElementById("search-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = formData.get("search");

    const data = await getData(search);
    console.log(data);

    const cards = document.getElementById("slots");
    const card = [...cards.children].find(card => card.classList.contains("empty"));
    card.innerHTML = "";

    const name = document.createElement("h2");
    name.classList.add("name");
    name.innerText = data.name;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image");

    const image = document.createElement("img");
    image.src = data.image;
    imageContainer.append(image);

    const infoContainer = document.createElement("info");
    infoContainer.classList.add("info");
    const typeElements = [];
    data.types.forEach(type => {
        const span = document.createElement("span");
        span.classList.add(colours[type]);
        span.innerText = type;
        typeElements.push(span);
    });
    typeElements.forEach(typeElement => infoContainer.append(typeElement));

    card.append(name, imageContainer, infoContainer);
    card.classList.remove("empty");
});
