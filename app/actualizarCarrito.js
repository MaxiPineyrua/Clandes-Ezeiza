import { guardarCarritoStorage } from "./storage.js";

// Estas son para agregar los productos calculando su valor en base a la cantidad y su precio.

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById("contador-carrito");
    const precioTotal = document.getElementById("precioTotal");

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

export { actualizarTotalesCarrito };