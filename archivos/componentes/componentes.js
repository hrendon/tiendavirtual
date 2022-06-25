function componente_descripcion(nombre, imagen, descripcion, tipo, valor, consola, cantidad, id){
    let html = '';
    if(cantidad > 0){
        html = `
            <a href="#" class="btn btn-primary" onclick="adicionar_carrito(${id})">Comprar</a>
        `
    } else {
        html = `
            <a href="#" class="btn btn-secondary">Agotado</a>
        `
    }
    return `
    <div class="col-md-3 col-sm-4 col-xs-12">
        <div class="card col-sm-12" style="margin:5px">
            <img src="caratulas/${imagen}" class="card-img-top" alt="imagen del videojuevo, por favor ponerla en carpeta caratulas con el mismo nombre del juego pero sin espacios" height="150px">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
                <p class="card-text"><strong>Consola:</strong> ${consola}</p>
                <p class="card-text"><strong>Cantidad:</strong> ${cantidad}</p>
                <p class="card-text"><strong>Valor:</strong> ${new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'COP', minimumFractionDigits: 2}).format(valor)}</p>
                ${html}
            </div>
        </div>
    </div>
    `
}

function componente_cargar_filtros(element){
    return `
    <div class="form-check">
        <input class="form-check-input aplicar_filtro_tipo" type="checkbox" value="${element}" id="idChek_${element}">
        <label class="form-check-label" for="idChek_${element}">
            <span class="badge bg-dark">${element}</span>
        </label>
    </div>
    `
}

function componente_filtro_seleccionado(element){
    return `
    <div  style="background-color: #eee;border-radius: 15px;margin: 5px;padding: 1px 10px;">
        ${element} 
    </div>
    `
}

function componente_opcion_carrito(cantidad){
    return `
        | <span style="font-weight: bold;">
            <i class="fa-solid fa-cart-shopping" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Carrito compras."></i>
            ${cantidad}
        </span>
    `
}

function componente_opcion_add_videojuego(){
    return `
        | <span data-bs-toggle="modal" data-bs-target="#exampleModal2" style="font-weight: bold;cursor: pointer;">Videojuegos</span>
    `
}

function componente_opcion_usuario(usuario){
    return `
        <span style="font-weight: bold;cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Click para salir..." onclick="salir()">
            <i class="fa-solid fa-user-astronaut"></i>
           ${usuario}
        </span>
    `
}

function componente_opcion_inicio(){
    return `
        <i class="fa-solid fa-user-astronaut"></i>
        <span id="usuario_logueado" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">Ingresar</span>
    `
}