async function getData(input) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = await response.json();
    let types = [];
    data.types.forEach(type => types.push(upperFirstChar(type.type.name)));
    console.log({
        name: upperFirstChar(data.name),
        image: data.sprites.front_default,
        types
    })
}

function upperFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}