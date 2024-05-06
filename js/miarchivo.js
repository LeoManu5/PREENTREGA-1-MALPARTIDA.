const productos = [
    { nombre: "Alarma", categoria: "alarmas", precio: 1000 },
    { nombre: "Polarizado", categoria: "polarizados", precio: 2000 },
    { nombre: "Levanta vidrios eléctrico", categoria: "levanta-vidrios", precio: 1500 },
    { nombre: "Llave codificada", categoria: "llaves-codificadas", precio: 3000 }
];


function mostrarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const item = document.createElement('div');
        item.innerHTML = `<p>${producto.nombre} - Precio: $${producto.precio}</p>
                          <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>`;
        listaProductos.appendChild(item);
    });
}

function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        mostrarProductos(productosFiltrados);
    }
}

function agregarAlCarrito(nombre, precio) {
    const carrito = document.getElementById('carrito');
    const item = document.createElement('li');
    item.textContent = `${nombre} - Precio: $${precio}`;
    carrito.appendChild(item);

    
    actualizarTotal(precio);
}

function actualizarTotal(precio) {
    const totalElement = document.getElementById('total');
    const totalActual = parseFloat(totalElement.textContent.replace('$', ''));
    const nuevoTotal = totalActual + precio;
    totalElement.textContent = `$${nuevoTotal}`;
}

document.getElementById('filtro-categoria').addEventListener('change', function() {
    const categoriaSeleccionada = this.value;
    filtrarProductos(categoriaSeleccionada);
});

mostrarProductos(productos);

function finalizarCompra() {
   
    alert('Compra finalizada. ¡Gracias por su compra!');
       
    limpiarCarrito();
}

function limpiarCarrito() {
    const listaCarrito = document.querySelector('#carrito ul');
    listaCarrito.innerHTML = '';

   
    const totalElement = document.getElementById('total');
    totalElement.textContent = '$0';
}
