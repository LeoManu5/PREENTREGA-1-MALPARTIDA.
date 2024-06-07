// miarchivo.js

const productos = [
    { id: 1, nombre: 'Alarma', precio: 1000, img: 'imagenes/D_NQ_NP_657720-MLA44674520482_012021-O.webp' },
    { id: 2, nombre: 'Polarizado', precio: 2000, img: 'imagenes/polarizados 2.jpg' },
    { id: 3, nombre: 'Levanta vidrios eléctrico', precio: 1500, img: 'imagenes/LEVANTA.jpg' },
    { id: 4, nombre: 'Llave codificada', precio: 3000, img: 'imagenes/llaves.jpg' }
];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderizarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto', 'col-md-4', 'mb-4');
        productoDiv.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-dark" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                </div>
            </div>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

function renderizarCarrito() {
    const carritoLista = document.querySelector('#carrito ul');
    carritoLista.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${item.nombre} - Precio: $${item.precio} x ${item.cantidad}
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoLista.appendChild(li);
    });
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById('total').textContent = `$${total}`;
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    const itemIndex = carrito.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        carrito.splice(itemIndex, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function pagar() {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Está a punto de finalizar la compra",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, pagar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carrito');
            renderizarCarrito();
            Swal.fire('¡Pagado!', 'Su compra ha sido completada.', 'success');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    renderizarCarrito();
});
