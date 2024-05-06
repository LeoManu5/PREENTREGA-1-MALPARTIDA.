function calcularCostoTotal() {
    
    const producto1 = parseFloat(document.getElementById("producto1").value);
    const producto2 = parseFloat(document.getElementById("producto2").value);
    const servicio1 = parseFloat(document.getElementById("servicio1").value);
    const servicio2 = parseFloat(document.getElementById("servicio2").value);

    let costoTotal = 0;

    const productos = [producto1, producto2];
    for (let i = 0; i < productos.length; i++) {
        if (!isNaN(productos[i])) { 
            costoTotal += productos[i];
        }
    }

    if (!isNaN(servicio1)) {
        costoTotal += servicio1;
    }
    if (!isNaN(servicio2)) {
        costoTotal += servicio2;
    }

    document.getElementById("resultado").innerText = `El costo total es: ${costoTotal.toFixed(2)}`;
    
    console.log("Se calculó el costo total correctamente.");
}

function borrarDatos() {
  
    document.getElementById("producto1").value = 0;
    document.getElementById("producto2").value = 0;
    document.getElementById("servicio1").value = 0;
    document.getElementById("servicio2").value = 0;

    document.getElementById("resultado").innerText = "";

    console.log("Los datos han sido borrados.");
}
