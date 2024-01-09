let inputPagina = document.getElementById('page-input');
let botonIrPagina = document.getElementById('go-to-page');

botonIrPagina.addEventListener('click', function() {
    console.log('Button clicked!');
    let nuevaPagina = parseInt(inputPagina.value);
    if (nuevaPagina >= 1 && nuevaPagina <= 42) {
        paginaActual = nuevaPagina;
        actualizarPagina();
    } else {
        alert('Número de página no válido. Debe estar entre 1 y 42.');
    }
});

function actualizarPagina() {

    if (paginaActual === 1) {
        botonPrimeraPagina.disabled = true;
        botonAnteriorPagina.disabled = true;
        botonUltimaPagina.disabled = false;  
        botonSiguientePagina.disabled = false; 
        document.querySelector('.botones3').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones4').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones1').style.background = 'gray';
        document.querySelector('.botones2').style.background = 'gray';
    } else if (paginaActual === 42) {
        botonSiguientePagina.disabled = true;
        botonUltimaPagina.disabled = true;
        document.querySelector('.botones3').style.background = 'gray';
        document.querySelector('.botones4').style.background = 'gray';
        botonPrimeraPagina.disabled = false;  
        botonAnteriorPagina.disabled = false;
        document.querySelector('.botones1').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones2').style.background = 'rgb(92, 228, 103)';
    } else {
        botonPrimeraPagina.disabled = false;
        botonAnteriorPagina.disabled = false;
        botonSiguientePagina.disabled = false;
        botonUltimaPagina.disabled = false;
        document.querySelector('.botones1').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones2').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones3').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones4').style.background = 'rgb(92, 228, 103)';
    }
    
    pedidoFetch(paginaActual);
}

// elementos del HTML
let divPersonajes = document.getElementById('personajes');

// botones filtro
let botonFiltroTodo = document.getElementById('filtroTodo');
let botonFiltroMujer = document.getElementById('filtroMujer');
let botonFiltroHombre = document.getElementById('filtroHombre');
let botonFiltroGenero = document.getElementById('filtroGenero');
let botonFiltrounknown = document.getElementById('filtrounknown');
    // botones Paginado
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnteriorPagina = document.getElementById("anterior");
let botonSiguientePagina = document.getElementById("siguiente");
let botonUltimaPagina = document.getElementById('ultimaPagina'); 

let spanCantidadPersonajes = document.getElementById('cantidadPersonajes');
let totalPersonajes;
let paginaActual=1;

// funcion para mostrar los personajes en el html
function mostrarEnElHtml (arrPersonajes) {
    let numeroPersonajes = arrPersonajes.length;
    spanCantidadPersonajes.innerText= numeroPersonajes;
    // estamos limpiando lo que habia antes en el div
    divPersonajes.innerHTML='';
    // ahora le agregamos los personajes nuevos que queres mostrar
    arrPersonajes.forEach((itemPersonaje)=>{
        
        divPersonajes.innerHTML+=`        <div class="personaje">
        <div class="card-image">
                                         <img src=${itemPersonaje.image}>
                                         </div>
                                         <strong><div class="datos">
                                        <p>Nombre: ${itemPersonaje.name}</p>
                                        <p>Genero: ${itemPersonaje.gender}</p>
                                        <p>Status: ${itemPersonaje.status}</p>
                                        <p>Species: ${itemPersonaje.species}</p>
                                        <p>Origen: ${itemPersonaje.origin.name}</p>
                                        <p>Locacion: ${itemPersonaje.location.name}</p>
                                        </div>  
                                        </strong>
                                        <hr>
                                        <br>
                                        <a href="vermas.html?id=${itemPersonaje.id}" target="_blank">Ver mas</a>
                                        <br>
                                        </div>`;
                                    })
                                    raiz.innerHTML = divPersonajes;
                                }

                                
// pedido de info con fetch
function pedidoFetch (pagina) {
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        totalPersonajes = data.results;
        // personajes es un array de objetos
        mostrarEnElHtml(totalPersonajes);
    })
};

pedidoFetch(paginaActual);

// Eventos
// 1- Nos traemos el elemento html que queremos agregarle el evento
// 2- Crear una funcion que se ejecute cuando se realice el evento
// 3- Creamos el evento, conectando todo

// Funciones para el filtro

function filtroMujer () {
    let mujeres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Female';
    });
    mostrarEnElHtml(mujeres);
};

function filtroHombre () {
    let hombres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Male'
    });
    mostrarEnElHtml(hombres);
}

function filtroTodo () {
    mostrarEnElHtml(totalPersonajes);
}
function filtroGenero () {
    let singenero = totalPersonajes.filter((itemPersonaje)=>{
        if(itemPersonaje.gender==='Genderless'){
            return itemPersonaje.gender==='Genderless'
        }
    });
    mostrarEnElHtml(singenero);
}
function filtrounknown () {
    let unknown = totalPersonajes.filter((itemPersonaje)=>{
        if(itemPersonaje.gender==='unknown'){
            return itemPersonaje.gender==='unknown'
        }
    });
    mostrarEnElHtml(unknown);
}

// Crear evento
// elementoHTML.addEventListener('tipo de evento', funcion que se ejecuta cuando se da el evento)
botonFiltroMujer.addEventListener('click',filtroMujer);
botonFiltroHombre.addEventListener('click',filtroHombre);
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroGenero.addEventListener('click',filtroGenero);
botonFiltrounknown.addEventListener('click',filtrounknown);

botonPrimeraPagina.disabled=true;
botonAnteriorPagina.disabled=true;
document.querySelector('.botones1').style.background = 'gray';
document.querySelector('.botones2').style.background = 'gray';

// function controlPaginado (pagina){
// // agregar los controles de todas las situaciones posibles
// }

// paginado
function siguientePagina() {
    // a la pagina actual le sumo 1
    paginaActual++;
    if(paginaActual===42){
        botonSiguientePagina.disabled= true;
        botonUltimaPagina.disabled=true;
    }else{
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        document.querySelector('.botones1').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones2').style.background = 'rgb(92, 228, 103)';

    }
    // se ejecuta el pedido fetch
    pedidoFetch(paginaActual);

};

function anteriorPagina(){
    paginaActual--;
    if(paginaActual===1){
        botonAnteriorPagina.disabled=true;
        botonPrimeraPagina.disabled=true;
        document.querySelector('.botones1').style.background = 'gray';
    document.querySelector('.botones2').style.background = 'gray';
    }else{
        botonSiguientePagina.disabled= false;        
        botonUltimaPagina.disabled=false;   
        document.querySelector('.botones3').style.background = 'rgb(92, 228, 103)';
        document.querySelector('.botones4').style.background = 'rgb(92, 228, 103)';   
    }
    pedidoFetch(paginaActual);
};

function primeraPagina() {
    paginaActual = 1;

    botonAnteriorPagina.disabled = true;
    botonPrimeraPagina.disabled = true;
    document.querySelector('.botones1').style.background = 'gray';
    document.querySelector('.botones2').style.background = 'gray';

    botonSiguientePagina.disabled = false;
    botonUltimaPagina.disabled = false;
    document.querySelector('.botones3').style.background = 'rgb(92, 228, 103)';
    document.querySelector('.botones4').style.background = 'rgb(92, 228, 103)';

    pedidoFetch(paginaActual);
}

function ultimaPagina() {
    paginaActual = 42;

    botonSiguientePagina.disabled = true;
    botonUltimaPagina.disabled = true;
    document.querySelector('.botones3').style.background = 'gray';
    document.querySelector('.botones4').style.background = 'gray';

    botonAnteriorPagina.disabled = false;
    botonPrimeraPagina.disabled = false;
    document.querySelector('.botones1').style.background = 'rgb(92, 228, 103)';
    document.querySelector('.botones2').style.background = 'rgb(92, 228, 103)';

    pedidoFetch(paginaActual);
}
botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click', ultimaPagina);

let total = totalPersonajes.length
console.log(total)