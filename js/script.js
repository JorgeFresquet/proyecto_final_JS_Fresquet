const contenedorProductos = document.getElementById("contenedor-productos");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = []; 

// Cargar productos al iniciar
const cargarProductos = async () => {
    try {
        const response = await fetch("./js/productos.json");
        productos = await response.json(); 
        renderizarProductos(productos); 
        cargarCategorias(productos); 
        cargarAutores(productos); 
    } catch (error) {
        console.error("Error al cargar productos: ", error);
    }
};

// Función para cargar categorías
const cargarCategorias = (productos) => {
    const filtroCategoria = document.getElementById('filtro-categoria');
    const categorias = [...new Set(productos.map(producto => producto.categoria.toLowerCase()))];
    filtroCategoria.innerHTML = `<option value="">Categoría:</option>`; 

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        filtroCategoria.appendChild(option);
    });
};

// Función para cargar autores
const cargarAutores = (productos) => {
    const filtroAutor = document.getElementById('filtro-autor');
    if (!filtroAutor) {
        console.error("El elemento 'filtro-autor' no se encuentra en el DOM.");
        return; 
    }

    const autores = [...new Set(productos.map(producto => producto.nombreAutor.toLowerCase()))]; 
    filtroAutor.innerHTML = `<option  value="">Autor:</option>`; 

    autores.forEach(autor => {
        const option = document.createElement("option");
        option.value = autor;
        option.textContent = autor.charAt(0).toUpperCase() + autor.slice(1);
        filtroAutor.appendChild(option);
    });
};

// Función para renderizar los productos
const renderizarProductos = (array) => {
    contenedorProductos.innerHTML = ''; 

    array.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto", "col-md-4"); 
        div.innerHTML = `
            <img src="${elm.img}" alt="${elm.nombreObra}" class="img-fluid">
            <h3 class="nombreObra">${elm.nombreObra}</h3>
            <h4>Autor: ${elm.nombreAutor}</h4>
            <p class="precioTarjeta">Precio: $${elm.precio}</p>
            <button id="agregar${elm.id}" class="btnTarjeta">Comprar</button>
        `;
        contenedorProductos.append(div);

        // Agregar evento de click para añadir el producto al carrito
        const boton = document.getElementById(`agregar${elm.id}`);
        boton.addEventListener("click", () => {
            agregarProducto(elm.id, productos);
            Toastify({
                text: `Se agregó ${elm.nombreObra}`,
                gravity: "bottom"
            }).showToast();
        });
    });
};

// Función para agregar productos al carrito
const agregarProducto = (id, productos) => {
    const productoAgregado = productos.find(prod => prod.id === id);

    if (carrito.some(producto => producto.id === id)) {
        const index = carrito.findIndex(producto => producto.id === id);
        carrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }

    guardarCarritoLs();
};

// Guardar carrito en LocalStorage
const guardarCarritoLs = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para filtrar productos
function filtrarProductos() {
    const nombreFiltro = document.getElementById('filtro-nombre')?.value.toLowerCase() || '';
    const autorFiltro = document.getElementById('filtro-autor')?.value.toLowerCase() || '';
    const categoriaFiltro = document.getElementById('filtro-categoria')?.value.toLowerCase() || '';

    // Filtrar por nombre, autor y categoría
    let productosFiltrados = productos.filter(producto => {
        return (
            (nombreFiltro === '' || producto.nombreObra.toLowerCase().includes(nombreFiltro)) &&
            (autorFiltro === '' || producto.nombreAutor.toLowerCase() === autorFiltro) &&
            (categoriaFiltro === '' || producto.categoria.toLowerCase() === categoriaFiltro)
        );
    });

    // Renderizar los productos filtrados
    renderizarProductos(productosFiltrados);
}

// Función para quitar los filtros y mostrar todos los productos
function quitarFiltros() {
    const filtroNombre = document.getElementById('filtro-nombre');
    const filtroAutor = document.getElementById('filtro-autor');
    const filtroCategoria = document.getElementById('filtro-categoria');

    if (filtroNombre) {
        filtroNombre.value = ''; 
    }
    if (filtroAutor) {
        filtroAutor.value = ''; 
    }
    if (filtroCategoria) {
        filtroCategoria.value = ''; 
    }

    renderizarProductos(productos); 
}

// Event listeners para los botones de filtros
document.getElementById('aplicar-filtros').addEventListener('click', filtrarProductos); 
document.getElementById('quitar-filtros').addEventListener('click', quitarFiltros); 

// Cargar los productos al iniciar y configurar botones de filtro
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();

    const filtroAutor = document.getElementById("filtro-autor");
    const filtroCategoria = document.getElementById("filtro-categoria");
    const aplicarFiltrosBtn = document.getElementById("aplicar-filtros");
    const quitarFiltrosBtn = document.getElementById("quitar-filtros");

    // Inicialmente ocultamos el botón de "Quitar filtros"
    quitarFiltrosBtn.style.display = "none";

    aplicarFiltrosBtn.addEventListener("click", function () {
        
        if (filtroAutor.value || filtroCategoria.value) {
            quitarFiltrosBtn.style.display = "inline-block";
        }
    });

    quitarFiltrosBtn.addEventListener("click", function () {

        filtroAutor.selectedIndex = 0;
        filtroCategoria.selectedIndex = 0;
        quitarFiltrosBtn.style.display = "none";
    });
});
