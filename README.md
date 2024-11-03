Descripción de funciones
cargarProductos
Carga los productos desde un archivo JSON externo (productos.json) y los guarda en el array productos. Luego, llama a renderizarProductos, cargarCategorias, y cargarAutores para mostrar los productos y llenar los filtros de categorías y autores.

cargarCategorias
Genera una lista de categorías únicas de los productos y las agrega como opciones en el filtro de categorías, permitiendo al usuario seleccionar una categoría para filtrar los productos.

cargarAutores
Similar a cargarCategorias, esta función crea una lista de autores únicos y los agrega al filtro de autores, permitiendo filtrar los productos por autor.

renderizarProductos
Muestra los productos en el contenedor HTML contenedorProductos. Genera el HTML de cada producto y agrega un botón "Comprar" para añadirlo al carrito. Este botón utiliza agregarProducto para gestionar el carrito.

agregarProducto
Añade un producto al carrito. Si el producto ya está en el carrito, incrementa su cantidad; si no, lo añade con una cantidad inicial de 1. Luego, guarda el carrito en localStorage llamando a guardarCarritoLs.

guardarCarritoLs
Guarda el contenido actual del carrito en localStorage para persistir los datos entre sesiones del usuario.

filtrarProductos
Aplica filtros de búsqueda basados en el nombre del producto, autor y categoría seleccionados por el usuario. Luego, llama a renderizarProductos para mostrar únicamente los productos que coinciden con los criterios de búsqueda.

quitarFiltros
Restablece los filtros de búsqueda y muestra todos los productos disponibles nuevamente, llamando a renderizarProductos.

Configuración inicial y event listeners
Al cargar la página (evento DOMContentLoaded), la función cargarProductos se ejecuta automáticamente para cargar y mostrar los productos. También se configuran event listeners en los botones de filtro ("Aplicar filtros" y "Quitar filtros"), permitiendo aplicar o eliminar filtros según sea necesario.
Descripción de funciones
cargarCarrito
Comprueba si hay productos en el carrito al cargar la página. Si el carrito no está vacío, llama a actualizarCarrito y muestra los elementos y el total; si está vacío, muestra un mensaje y oculta los elementos relacionados con el carrito.

actualizarCarrito
Actualiza la visualización del carrito en la interfaz. Genera el HTML de cada producto en el carrito y muestra botones para aumentar, disminuir o eliminar productos. También recalcula el total y lo muestra en la interfaz.

borrarDelCarrito
Elimina un producto del carrito basándose en su id. Si el producto se encuentra en el carrito, lo elimina y guarda el nuevo estado del carrito en localStorage.

guardarCarrito
Guarda el estado actual del carrito en localStorage, permitiendo que los datos persistan entre recargas de página o sesiones del usuario.

Descripción de la Interacción con el Usuario
Modificar la cantidad de productos
En actualizarCarrito, cada producto muestra botones "+" y "-" que permiten al usuario ajustar la cantidad. Al cambiar la cantidad, se llama a guardarCarrito y se actualiza el total en la interfaz.

Eliminar productos del carrito
Cada producto tiene un botón "Dar de baja" que muestra una confirmación con Swal.fire. Si el usuario confirma, el producto se elimina llamando a borrarDelCarrito, y se actualiza el carrito en pantalla.
