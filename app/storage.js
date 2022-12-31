// Esto sirve para que, en caso de cerrar la página, el carrito siga conteniendo sus productos sin perder la compra. 

const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    return carritoStorage;
}

export { guardarCarritoStorage, obtenerCarritoStorage };