// Datos de ejemplo de productos con precios
const productos = [
    { nombre: "Alarma", categoria: "alarmas", precio: 1000, imagen: "imagenes/D_NQ_NP_657720-MLA44674520482_012021-O.webp" },
    { nombre: "Polarizado", categoria: "polarizados", precio: 2000, imagen: "imagenes/polarizados 2.jpg" },
    { nombre: "Levanta vidrios eléctrico", categoria: "levanta-vidrios", precio: 1500, imagen: "imagenes/LEVANTA.jpg" },
    { nombre: "Llave codificada", categoria: "llaves-codificadas", precio: 3000, imagen: "imagenes/llaves.jpg" }
];

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('producto');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}')">Agregar al carrito</button>`;
        listaProductos.appendChild(item);
    });
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        mostrarProductos(productosFiltrados);
    }
}

function agregarAlCarrito(nombre, precio) {
    const carrito = document.querySelector('#carrito ul');
    const item = document.createElement('li');
    item.textContent = `${nombre} - Precio: $${precio}`;
    carrito.appendChild(item);

    // Sumar el precio al total del carrito
    actualizarTotal(precio);

    // Guardar el carrito en Local Storage
    guardarCarrito();
}


// Función para actualizar el total del carrito
function actualizarTotal(precio) {
    const totalElement = document.getElementById('total');
    const totalActual = parseFloat(totalElement.textContent.replace('$', ''));
    const nuevoTotal = totalActual + precio;
    totalElement.textContent = `$${nuevoTotal}`;

    // Guardar el total en Local Storage
    localStorage.setItem('totalCarrito', nuevoTotal);
}

// Función para guardar el carrito en Local Storage
function guardarCarrito() {
    const carritoItems = [];
    document.querySelectorAll('#carrito ul li').forEach(item => {
        carritoItems.push(item.textContent);
    });
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

// Función para cargar el carrito desde Local Storage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        document.querySelector('#carrito ul').appendChild(li);
    });

    const total = localStorage.getItem('totalCarrito') || '0';
    document.getElementById('total').textContent = `$${total}`;
}

// Función para limpiar el carrito
function limpiarCarrito() {
    const listaCarrito = document.querySelector('#carrito ul');
    listaCarrito.innerHTML = '';

    // Reiniciar el total a cero
    const totalElement = document.getElementById('total');
    totalElement.textContent = '$0';

    // Limpiar el carrito de Local Storage
    localStorage.removeItem('carrito');
    localStorage.removeItem('totalCarrito');
}

// Función para finalizar la compra y limpiar el carrito
function finalizarCompra() {
    alert('Compra finalizada. ¡Gracias por su compra!');
    limpiarCarrito();
}

// Event listener para cambiar el filtro
document.getElementById('filtro-categoria').addEventListener('change', function() {
    const categoriaSeleccionada = this.value;
    filtrarProductos(categoriaSeleccionada);
});

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);

// Cargar el carrito desde Local Storage al cargar la página
cargarCarrito();

