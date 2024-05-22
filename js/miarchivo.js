// js/miarchivo.js

// Array de productos en formato JSON
const productos = [
    {
        "id": 1,
        "nombre": "Alarma",
        "precio": 1000,
        "imagen": "imagenes/D_NQ_NP_657720-MLA44674520482_012021-O.webp",
        "categoria": "alarmas"
    },
    {
        "id": 2,
        "nombre": "Polarizado",
        "precio": 2000,
        "imagen": "imagenes/polarizados 2.jpg",
        "categoria": "polarizados"
    },
    {
        "id": 3,
        "nombre": "Levanta vidrios eléctrico",
        "precio": 1500,
        "imagen": "imagenes/LEVANTA.jpg",
        "categoria": "levanta-vidrios"
    },
    {
        "id": 4,
        "nombre": "Llave codificada",
        "precio": 3000,
        "imagen": "imagenes/llaves.jpg",
        "categoria": "llaves-codificadas"
    }
];

// Inicializar carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar productos
function renderizarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
    const carritoDiv = document.getElementById('carrito').querySelector('ul');
    carritoDiv.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        const carritoItem = document.createElement('li');
        carritoItem.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoDiv.appendChild(carritoItem);
        total += item.precio * item.cantidad;
    });
    document.getElementById('total').textContent = `$${total}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para finalizar la compra (puedes personalizar esta función según tus necesidades)
function finalizarCompra() {
    alert('Compra finalizada,Gracias por Elejirnos');
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

// Función para filtrar productos por categoría
function filtrarProductos() {
    const categoria = document.getElementById('filtro-categoria').value;
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Inicializar la aplicación
document.getElementById('filtro-categoria').addEventListener('change', filtrarProductos);
renderizarProductos(productos);
renderizarCarrito();
