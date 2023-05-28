const carrito = [];

function jsonALocalStorage() {
  fetch("json/articulos.json")
    .then((respuesta) => respuesta.json())
    .then((data) => {
      localStorage.setItem("json", JSON.stringify(data));
    });
}

function stockEnLS() {
  return JSON.parse(localStorage.getItem("json")) || [];
}

function guardarStockCarritoLS(array) {
  localStorage.setItem("elegidos", JSON.stringify(array));
}

function itemsElegidosCarritoLS() {
  return JSON.parse(localStorage.getItem("elegidos")) || [];
}

function stock() {
  const stockTienda = stockEnLS();

  const contenido = stockTienda
    .map((vino) => {
      return `<div id="${vino.id}" class="col-md-4 container-tarjeta">
        <div class="card text-center text-white fw-bold mb-3" id="card-vinos" >
          <img src="image/${vino.imagen}" class="card-img-top" alt="${vino.nombre}">
          <div class="card-body">
            <h6 class="card-title fw-bold">${vino.varietal}</h6>
            <p class="card-text">${vino.nombre}</p>
            <p class="card-text">$ ${vino.precio}</p>
            <button type="button" class="btn btn-success btn-agregar">Agregar al Carrito</button>
          </div>
        </div>
      </div>`;
    })
    .join('');

  document.getElementById("productos").innerHTML = contenido;

  document.getElementById("productos").style.display = "flex";
  document.getElementById("productos").style.justifyContent = "center";

  agregarAlCarrito();
}

function agregarAlCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest(".container-tarjeta").id);
      const item = stockEnLS().find((vino) => vino.id === itemId);

      const pos = itemsCarrito.findIndex((vino) => vino.id === itemId);
      if (pos > -1) {
        itemsCarrito[pos].cantidad += 1;
      } else {
        item.cantidad = 1;
        itemsCarrito.push(item);
      }

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Producto Agregado!!",
        showConfirmButton: false,
        timer: 1000,
      });

      guardarStockCarritoLS(itemsCarrito);
      botonCarrito();
    });
  });
}

function botonCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();
  const boton = document.createElement("button");
  const img = document.createElement("img");
  const badge = document.createElement("span");

  boton.setAttribute("type", "button");
  boton.classList.add("btn");

  img.setAttribute("src", "image/cart.png");
  img.setAttribute("alt", "cart");
  img.setAttribute("width", "42");

  badge.classList.add("badge", "bg-secondary");
  badge.textContent = ArticulosEnCarrito();

  boton.appendChild(img);
  boton.appendChild(badge);

  const btnCart = document.getElementById("btn-cart");
  btnCart.innerHTML = ""; // Limpiar el contenido anterior
  btnCart.appendChild(boton);
}


function ArticulosEnCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();

  return itemsCarrito.reduce((sumatoria, vino) => sumatoria + vino.cantidad, 0);
}

function descuento() {
  const itemsCarrito = itemsElegidosCarritoLS();

  const dto = itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad,
    0
  );

  if (dto >= 4) {
    return itemsCarrito.reduce(
      (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio * 1,
      0
    );
  }

  return itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio,
    0
  );
}

function totalCompra() {
  const itemsCarrito = itemsElegidosCarritoLS();

  return itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio,
    0
  );
}
