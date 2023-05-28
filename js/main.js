function stock() {
  const stockTienda = stockEnLS();

  let contenido = "";

  stockTienda.forEach((vino) => {
    contenido += `<div id="${vino.id}" class= "col-md-4 container-tarjeta">
      <div class="card text-center text-white fw-bold mb-3" id="card-vinos" >
      <img src="image/${vino.imagen}" class="card-img-top" alt="${vino.nombre}">
      <div class="card-body">
        <h6 class="card-title fw-bold ">${vino.varietal}</h6>
        <p class="card-text">${vino.nombre}</p>
        <p class="card-text">$ ${vino.precio}</p>
        <button type="button" class="btn btn-success btn-agregar">Agregar al Carrito</button>
        
      </div>
    </div>
    </div>`;
  });
  document.getElementById("productos").innerHTML = contenido;
}

jsonALocalStorage();
stock();
agregarAlCarrito();
botonCarrito();