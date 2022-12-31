import { mostrarProductos } from "./App.js";
import { productos } from "./stock.js";


// Acá es donde se puede ingresar el nombre del producto para poder filtrar los demás productos, sería un cuadro de búsqueda.

const inputSearch = document.getElementById("buscarProducto");

const buscarProducto = (productos, productoNombre) => {
    const productosFiltrados = productos.filter( producto => producto.nombre.toLowerCase().includes(productoNombre.toLowerCase()));
    mostrarProductos(productosFiltrados);
};

inputSearch.addEventListener("input", (e) => {
    buscarProducto(productos, e.target.value);
});