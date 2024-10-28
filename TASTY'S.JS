//MENU
function toggleMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";  // Añade la clase "responsive" para mostrar el menú
    } else {
      x.className = "topnav";  // Vuelve al estado inicial, ocultando el menú
    }
  }




//NETART
const listaComidas = ['🍎', '🥕', '🍞', '🍳', '🍕', '🍔', '🍣'];

function cambiarComida(elemento) {
    const comidaAleatoria = listaComidas[Math.floor(Math.random() * listaComidas.length)];
    elemento.innerText = comidaAleatoria;
}

function cambiarFondo() {
    const colores = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF'];
    document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
}