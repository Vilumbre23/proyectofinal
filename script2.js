let divVermasPersonaje = document.getElementById('vermas-personaje');

function mostrarEnElHtml(personaje) {
    divVermasPersonaje.innerHTML = `
        <div class="person1">
            <div class="card-image">
                <img class="img2" src=${personaje.image}>
            </div>
            <div class="datos">
                <p>Id: ${personaje.id}</p>
                <p>Nombre: ${personaje.name}</p>
                <p>Genero: ${personaje.gender}</p>
                <p>Status: ${personaje.status}</p>
                <p>Species: ${personaje.species}</p>
                <p>Origen: ${personaje.origin.name}</p>
                <p>Origen2: ${personaje.location.url}</p>
                <p>Locacion: ${personaje.location.name}</p>
                <ul>
                    ${personaje.episode.map(episode => `<li>${episode}</li>`).join('')}
                </ul>
                <p>Url: ${personaje.url}</p>
                <p>Creación: ${personaje.created}</p>
            </div>
            <br>
        </div>`;
}

// Extraer character id con la url
let params = new URLSearchParams(window.location.search);
let id = params.get("id");

// Pedido de info con fetch
function pedidoFetch(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((data) => {
            return data.json();
        })
        .then((personaje) => {
            // Mostrar el personaje en el HTML
            mostrarEnElHtml(personaje);
        })
        .catch((error) => {
            console.error('Error fetching character:', error);
        });
}

// Llamar a la función con el id de la página
pedidoFetch(id);