const BASE_URL = "https://swapi.dev/api"; // URL base de la API de Star Wars
const ENDPOINT = "/films/1/"; // URL a donde haré la consulta

let personajes = [];
// Hacer la peticion a la API
// fetch(`${BASE_URL}${ENDPOINT}`) // https://swapi.dev/api/films/1/
//     .then((respuesta) => respuesta.json()) // return implicito
//     .then((respuestaJSON) => {
//         const personajesURL = respuestaJSON.characters;

//         const infoPersonajes = personajesURL.map((URLpersonaje) => {
//             return fetch(URLpersonaje)
//                 .then((respuesta) => respuesta.json())
//                 .then((InfoPersonaje) => InfoPersonaje);
//         });

//         Promise.all(infoPersonajes).then((personajesPromise) => {
//             personajes = personajesPromise;
//             console.log(personajes, "Estoy dentro del then"); // sólo está lleno dentro de este then
//         });
//     });

const obtenerPersonajes = async () => {
    // hacer petición a la API con el endpoint film/1 (podria ser cualquier otro endpoint)
    const respuesta = await fetch(`${BASE_URL}${ENDPOINT}`);

    // esperamos a que respuesta se tranforme en algo legible para nosotros o nuestro programa
    const respuestaJSON = await respuesta.json();
    
    // sacamos los personajes (characters) del resultado de respuesJSON
    const arregloURLPersonajes = respuestaJSON.characters; // esto devuelve un arreglo de string que son URL a la informacion del personaje ["stringURL", "stringURL"];
    
    // recorremos cada uno de los elementos en arregloURLPersonajes (recordemos que son URL)
    const infoPersonajes = arregloURLPersonajes.map(async (URLPersonaje) => {
        // esperamos a que se resuelva la peticion a la URL
        const respuesta = await fetch(URLPersonaje);
        // esperamos a que devuelve la informacion del personaje en formato JSON
        const infoPersonaje = await respuesta.json();
        // retornamos la promesa de información del personaje (ESTO ES UNA PROMESA)
        return infoPersonaje;
    }); // este proceso devuelve un arreglo de promesas
    
    // tomamos el arreglo infoPersonajes y esperamos que se resuelvan todas las promesas juntas
    const personajesArray = await Promise.all(infoPersonajes);
    
    // devolvemos las promesas resultas que son un arreglo de objetos con la informacion de cada personaje en la película
    return personajesArray;
};

