// elementos del HTML
let divPersonajes = document.getElementById('personajes');
let id = window.location.search.substring(1);
let paginaActual=1;

// Pedido de info con fetch
function pedidoFetch (pagina, id) {
    fetch('https://rickandmortyapi.com/api/character/'+pagina)
    .then((data)=>{
      return data.json();
    })
    .then((data)=>{
      // Obtener el array de personajes
      let arrPersonajes = data.results;
      // Buscar el personaje con el id pasado como parámetro
      let personaje = arrPersonajes.find(p => p.id === id);
      // Mostrar el personaje en el HTML
      mostrarEnElHtml(personaje);
    })
  };
  
  // Llamar a la función con la página actual y el id de la página
  pedidoFetch(paginaActual, id);