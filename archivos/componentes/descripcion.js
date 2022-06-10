function componente_descripcion(nombre, imagen, descripcion, tipo, valor) {
    return `
    <div class="card col-sm-3" style="margin:5px"">
        <img src="caratulas/${imagen}" class="card-img-top img-fluid" alt="imagen del videojuevo">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
            <a href="#" class="btn btn-primary">Valor: ${valor}</a>
        </div>
    </div>
    `
}