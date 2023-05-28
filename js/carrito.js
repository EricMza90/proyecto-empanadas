function itemsEnCarrito() {
  const seleccion = itemsElegidosCarritoLS();

  let contenido = "";

  if (seleccion.length === 0) {
    contenido = `<div class="alert alert-secondary text-center col-4 mx-auto" role="alert"> <b>Tu Carrito está Vacío !!!</b></div>`;
  } else {
    contenido += `
    <div class="d-flex justify-content-center">
    <div class="col-md-6">
    <table class="table table-hover table-borderless bg-white">
      <thead>
        <tr class="bg-dark">
          <th class="text-white text-center">PRODUCTO</th>
          <th class="text-white text-center"></th>
          <th class="text-white text-center">CANTIDAD</th>
          <th class="text-white text-center"></th>
          <th class="text-white text-center">PRECIO</th>
          <th class="text-white text-center"></th>
        </tr>
      </thead>
      <tbody>`;

    seleccion.forEach((vino) => {
      contenido += `
        <tr>
          <td class="align-middle fw-bold">${vino.nombre}</td>
          <td id="${vino.id}" class="text-center container-eliminar" width="30">
            <a href="#" class="btn btn-eliminar">
              <img src="image/quitar.png" alt="cart" class="btn-icon" title="Quitar" width="22">
            </a>
          </td>
          <td class="container-tabla text-center align-middle fw-bold" width="30">${vino.cantidad}</td>
          <td id="${vino.id}" class="text-center container-agregar" width="30">
            <a href="#" class="btn btn-sumar">
              <img src="image/agregar.png" alt="cart" class="btn-icon" title="Agregar" width="22">
            </a>
          </td>
          <td class="text-center fw-bold" width="130">$ ${(vino.precio * vino.cantidad).toFixed(2)}</td>
          <td class="text-center" width="80">
          <a href="#" class="btn btn-eliminar" onclick="eliminarItem(event)">
          <img id="${vino.id}" src="image/tacho.png" alt="cart" class="btn-icon container-eliminar" title="Eliminar Articulo" width="18">
        </a>
          </td>
        </tr>`;
    });

    contenido += `</tbody>
      <tfoot class="bg-dark">
        <tr>
          <th class="text-white bg-dark">TOTAL A PAGAR</th>
          <th class="text-white bg-dark"></th>
          <th class="text-white bg-dark text-center"></th>
          <th class="text-white bg-dark text-center"></th>
          <th class="text-white bg-dark text-center">$ ${descuento().toFixed(2)}</th>
          <th class="text-white bg-dark text-center"></th>
        </tr>
      </tfoot>
    </table>
    </div>
    </div>`;

    contenido += `<div class="d-flex justify-content-center mt-3">
      <button type="button" class="btn btn-success col-4 mx-auto" width="80" onclick="finalizarCompra()">FINALIZAR COMPRA</button>
    </div>`;
  }

  document.getElementById("productos_carrito").innerHTML = contenido;
  agregarEventosBotones();
}

function agregarEventosBotones() {
  const botonesEliminar = document.querySelectorAll(".container-eliminar .btn-eliminar");
  const botonesSumar = document.querySelectorAll(".btn-sumar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarItem);
  });

  botonesSumar.forEach((boton) => {
    boton.addEventListener("click", sumarItem);
  });
}

function eliminarItem(event) {
  event.preventDefault();
  const itemId = parseInt(event.target.closest(".container-eliminar").id);
  const itemsCarrito = itemsElegidosCarritoLS();
  const pos = itemsCarrito.findIndex((vino) => vino.id === itemId);

  if (itemsCarrito[pos].cantidad > 1) {
    itemsCarrito[pos].cantidad--;
  } else {
    itemsCarrito.splice(pos, 1);
  }

  guardarStockCarritoLS(itemsCarrito);
  itemsEnCarrito();
  botonCarrito();
}

function sumarItem(event) {
  event.preventDefault();
  const itemId = parseInt(event.target.closest(".container-agregar").id);
  const itemsCarrito = itemsElegidosCarritoLS();
  const pos = itemsCarrito.findIndex((vino) => vino.id === itemId);

  itemsCarrito[pos].cantidad++;

  guardarStockCarritoLS(itemsCarrito);
  itemsEnCarrito();
  botonCarrito();
}

function finalizarCompra() {
  const itemsCarrito = itemsElegidosCarritoLS();

  let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";
  itemsCarrito.forEach((vino) => {
    mensaje += `${vino.nombre} ${vino.cantidad} Docena/as\n`; // Agregar salto de línea después de cada producto
  });

  const totalPagar = descuento().toFixed(2); // Obtener el total a pagar
  mensaje += `\nTotal a pagar: $${totalPagar}`;

  // Mostrar mensaje de confirmación antes de redirigir al enlace de WhatsApp
  if (confirm("¿Deseas confirmar tu pedido?")) {
    const whatsappLink = `https://api.whatsapp.com/send?phone=2613648777&text=${encodeURIComponent(mensaje)}`;
    window.location.href = whatsappLink;

    // Vaciar el carrito después de confirmar el pedido
    vaciarCarrito();
  }
}

function vaciarCarrito() {
  localStorage.removeItem("elegidos");
  itemsEnCarrito();
  botonCarrito();
}

itemsEnCarrito();
botonCarrito();