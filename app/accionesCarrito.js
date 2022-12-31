import { actualizarTotalesCarrito } from "./actualizarCarrito.js";
import { productos } from "./stock.js";
import { obtenerCarritoStorage } from "./storage.js";

let carrito = [];


// En caso de que el producto esté repetido, avisará que se agregó otro del mismo tipo. 

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage();
    };

    const productoRepetido = carrito.find( producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
        Toastify({
            text: `Se agregó otro ${productoRepetido.nombre}`,
            duration: 2000
        }).showToast();
    } else {
        agregarAlCarrito(productoId);
    }
};


// Agregar productos al carrito 

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const producto = productos.find( producto => producto.id === productoId );
    carrito.push(producto);

    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
    Toastify({
        text: `Se agregó ${producto.nombre} al carrito`,
        duration: 2000
    }).showToast();
};


// Creo el carrito para poder ver los productos que agrego 

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor");

    contenedor.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
        contenedor.appendChild(div);
    });
};

// Eliminar producto del carrito 

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter( producto => producto.id != productoId);

    actualizarTotalesCarrito(carritoActualizado);
    pintarCarrito(carritoActualizado);
};

// Creo el botón de Vaciar Carrito

const vaciarCarrito = document.querySelector (".vaciar-carrito");

// Acá hago uso de Sweet Alert para que quede más lindo. 
vaciarCarrito.addEventListener("click", (e) => {
    
    e.stopPropagation();
    
    const existeElemento = document.getElementById ("contador-carrito");
    if (e.target.classList.contains("vaciar-carrito")) {
        if (existeElemento.innerText > 0) {
            Swal.fire({
                tittle: "¿Está seguro?",
                text: "Eliminará todos los productos del carrito.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Vaciar",
                cancelButtontext: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    vaciarTodoElCarrito(vacio);
                    Swal.fire (
                        "Vacío",
                        "El carrito se vació",
                        "success"
                    )
                }
            })    
        }
        else {
            Swal.fire({
                tittle: "Vacío",
                text: "El carrito de compras ya está vacío",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Volver",
            })
        }
    }
});

// Función para vaciar el carrito.

let vacio = [];
const vaciarTodoElCarrito = (vacio) => {
    obtenerCarritoStorage(vacio);
    pintarCarrito(vacio);
    actualizarTotalesCarrito(vacio);
};

// Acá termino de crear el coso del carrito, no borrar nada q esté fuera de esto.

export { agregarAlCarrito, validarProductoRepetido, pintarCarrito, eliminarProductoCarrito, vaciarTodoElCarrito, actualizarTotalesCarrito,};