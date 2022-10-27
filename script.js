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
