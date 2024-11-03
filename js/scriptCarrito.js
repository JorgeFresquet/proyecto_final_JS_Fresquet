const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contenedorTotal = document.querySelector(".contenedoTotal"); // Selecciona el contenedor del total
const finalizarCompra = document.querySelector(".finalizarCompra"); // Selecciona el contenedor del botón de compra
const contenedoItems = document.querySelector(".contenedoItems"); // Asegúrate que el nombre de clase sea correcto
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Oculta el contenedor del total y el botón de finalizar compra si el carrito está vacío
const cargarCarrito = () => {
    if (carrito.length > 0) {
        actualizarCarrito();
        contenedorTotal.classList.remove("oculto");
        contenedorTotal.classList.add("mostrar-flex");
        finalizarCompra.classList.remove("oculto");
        finalizarCompra.classList.add("mostrar-flex");
        contenedoItems.classList.remove("oculto");
        contenedoItems.classList.add("mostrar-flex");
    } else {
        contenedorCarrito.innerHTML = `<p>El carrito está vacío.</p>`;
        contenedorTotal.classList.add("oculto");
        finalizarCompra.classList.add("oculto");
        contenedoItems.classList.add("oculto");
    }
};

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p>El carrito está vacío</p>`;
        contenedorTotal.classList.add("oculto");
        finalizarCompra.classList.add("oculto");
        contenedoItems.classList.add("oculto");
    } else {
        contenedorTotal.classList.remove("oculto");
        contenedorTotal.classList.add("mostrar-flex");
        finalizarCompra.classList.remove("oculto");
        finalizarCompra.classList.add("mostrar-flex");
        contenedoItems.classList.remove("oculto");
        contenedoItems.classList.add("mostrar-flex");

        carrito.forEach(elm => {
            const div = document.createElement("div");
            div.classList.add("producto_carrito");

            div.innerHTML = `
             <img src="../${elm.img}" alt="${elm.nombreObra}" class="img-fluid">
            <p class="obraCarrito">${elm.nombreObra}</p>
            <p class="infoCarrito"> $${elm.precio}</p>
            <div class="cantidadCarrito">
                 <button class="btnCarrito" id="restar${elm.id}">-</button>
                <p class="infoCarritoCant"> ${elm.cantidad}</p>
                <button class="btnCarrito" id="sumar${elm.id}">+</button>
            </div>
            <p class="cantTotal">$${elm.precio * elm.cantidad}</p>
            <button class="btnBaja" id="borrar${elm.id}">Dar de baja</button>
            `;
            
            contenedorCarrito.appendChild(div);    
            
            //resta 
            document.getElementById(`restar${elm.id}`).addEventListener("click", () => {
                if (elm.cantidad > 1) { // Asegura que la cantidad no sea menor a 1
                    elm.cantidad--;
                    guardarCarrito();
                    actualizarCarrito();
                }
            });
            //suma
            document.getElementById(`sumar${elm.id}`).addEventListener("click", () => {
                elm.cantidad++;
                guardarCarrito();
                actualizarCarrito();
            });

            // borrar producto seleccionado
            const boton = document.getElementById(`borrar${elm.id}`);
            boton.addEventListener("click", () => {
                Swal.fire({
                    title: "¿Quieres borrar el producto del carrito?",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, borrar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        borrarDelCarrito(elm.id);
                        actualizarCarrito();
                    }
                });
            });
        });
    }

    //actualiza total
    totalCarrito.innerText = `Total: $${carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)}`;
};

// eliminar producto del carrito
const borrarDelCarrito = (id) => {
    const productoIndex = carrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        carrito.splice(productoIndex, 1);
        guardarCarrito();
    }
};

// guardar localStorage
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Carga carrito
cargarCarrito();
