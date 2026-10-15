let carrito = [];

// AGREGAR
function agregarCarrito(nombre, precio){

    let producto = carrito.find(p => p.nombre === nombre);

    if(producto){
        producto.cantidad++;
    }else{
        carrito.push({nombre, precio, cantidad:1});
    }

    actualizarCarrito();
}

// ELIMINAR
function eliminarProducto(index){
    carrito.splice(index,1);
    actualizarCarrito();
}

// ACTUALIZAR
function actualizarCarrito(){
    let lista = document.getElementById("carrito");
    let total = 0;
    let contador = 0;

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {

        let item = document.createElement("li");

        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        contador += producto.cantidad;

        item.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        x ${producto.cantidad} = $${subtotal}
        <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        lista.appendChild(item);
    });

    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = contador;
}

// CREAR TABLA PARA EMAIL
function crearFacturaHTML(){

    let filas = "";
    let total = 0;

    carrito.forEach(producto => {

        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        filas += `
        <tr>
            <td style="padding:8px;">${producto.nombre}</td>
            <td style="padding:8px;">$${producto.precio}</td>
            <td style="padding:8px;">${producto.cantidad}</td>
            <td style="padding:8px;">$${subtotal}</td>
        </tr>
        `;
    });

    return `
    <table style="border-collapse: collapse; width:100%; font-family: Arial;">
        <tr style="background:black; color:white;">
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
        ${filas}
    </table>
    `;
}

// GENERAR FACTURA VISUAL
function generarFactura(){

    let contenedor = document.getElementById("factura");
    let detalle = document.getElementById("detalleFactura");
    let totalFactura = 0;

    detalle.innerHTML = "";

    carrito.forEach(producto => {

        let fila = document.createElement("tr");

        let subtotal = producto.precio * producto.cantidad;
        totalFactura += subtotal;

        fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>$${subtotal}</td>
        `;

        detalle.appendChild(fila);
    });

    document.getElementById("totalFactura").textContent = totalFactura;

    let fecha = new Date();
    document.getElementById("fecha").textContent = fecha.toLocaleString();

    contenedor.classList.remove("oculto");
}

// PAGAR + EMAILJS
function pagar(){


    let confirmar = confirm("¿Desea realizar el pago?");

    if(confirmar){

        let facturaHTML = crearFacturaHTML();

        let totalFinal = 0;
        carrito.forEach(p => {
            totalFinal += p.precio * p.cantidad;
        });

        let fecha = new Date().toLocaleString();

        emailjs.send("service_9y4ox3r", "template_oc3j0uj", {
            factura: facturaHTML,
            total: totalFinal,
            fecha: fecha
        })
        .then(() => {
            alert("Factura enviada al correo ");
        })
        .catch((error) => {
            alert("Error al enviar ");
            console.log(error);
        });

        generarFactura();

        carrito = [];
        actualizarCarrito();
    }
}

// IMPRIMIR
function imprimir(){
    window.print();
}
