console.log('carga archivo script');
var listado_de_productos = [];
var filtros_puestos        = [];

function inicio() {
    let html = '';
    let info = new URLSearchParams();
    info.append('tipo_peticion','todo_el_listado');
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        if(data.mensaje != undefined){
            // alert('Alerta, detalle: ' + data.mensaje);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.mensaje,
                footer: 'Detalle de la alerta.'
              })
        } else {
            listado_de_productos = data;
            data.forEach(element => {
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.promo, element.cantidad, element.id)
            });
            document.getElementById('panel_muestra').innerHTML = html;
            // TODO: acá va cada tipo de filtro posible
            cargar_filtros('tipo', 'filtro_tipo');
            cargar_filtros('promo', 'filtro_promo');
            cargar_filtros('empresa', 'filtro_empresa');
            cargar_filtros('publicado', 'filtro_publicado');
        }
    }).catch(error=>{
        // alert('Ha ocurrido un error, detalle: ' + error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: 'Detalle del error ocurrido'
          })
    })
}
inicio();

function cargar_filtros(filtros, section_filtro){
    let html = '';
    let tipo = [];
    listado_de_productos.forEach(element => {
        eval('tipo.push(element.'+filtros+');');
        filtro_seleccionado();
    });
    let result = tipo.filter((item,index)=>{
        return tipo.indexOf(item) === index;
    })
    result.forEach(element => {
       html = html + componente_cargar_filtros(element, section_filtro);
    });
    document.getElementById(section_filtro).innerHTML = html;
}

function aplicar_filtro(){
    document.querySelector("input[type='search']").value = '';
    let html         = '';
    filtros_puestos  = [];

    // TODO: acá va cada tipo de filtro posible
    let seleccion_filtro_tipo    = [];
    let seleccion_filtro_promo = [];
    let seleccion_filtro_empresa = [];
    let seleccion_filtro_publicado = [];
    let check_filtro_tipo = document.querySelectorAll('.aplicar_filtro_tipo_filtro_tipo');
    check_filtro_tipo.forEach(element => {
        if(element.checked == true){
            seleccion_filtro_tipo.push(element.value);
        }
    });
    let check_filtro_promo = document.querySelectorAll('.aplicar_filtro_tipo_filtro_promo');
    check_filtro_promo.forEach(element => {
        if(element.checked == true){
            seleccion_filtro_promo.push(element.value);
        }
    });
    let check_filtro_empresa = document.querySelectorAll('.aplicar_filtro_tipo_filtro_empresa');
    check_filtro_empresa.forEach(element => {
        if(element.checked == true){
            seleccion_filtro_empresa.push(element.value);
        }
    });
    let check_filtro_publicado = document.querySelectorAll('.aplicar_filtro_tipo_filtro_publicado');
    check_filtro_publicado.forEach(element => {
        if(element.checked == true){
            seleccion_filtro_publicado.push(element.value);
        }
    });
    // TODO: acá va cada tipo de filtro posible
    if(
        seleccion_filtro_tipo.length    == 0 && 
        seleccion_filtro_promo.length == 0 &&
        seleccion_filtro_empresa.length == 0 &&
        seleccion_filtro_publicado.length     == 0
        ){
        inicio();
    } else {
        listado_de_productos.forEach(element => {
            let mostrar = 'no';
            // TODO: acá va cada tipo de filtro posible
            if(seleccion_filtro_tipo.length >0){
                if(seleccion_filtro_tipo.includes(element.tipo) == true){
                    filtros_puestos.push(element.tipo);
                    mostrar = 'si';
                } else {
                    mostrar = 'no_validado';
                }
            }
            if(seleccion_filtro_promo.length > 0 && mostrar != 'no_validado'){
                if(seleccion_filtro_promo.includes(element.promo) == true){
                    filtros_puestos.push(element.promo);
                    mostrar = 'si';
                } else {
                    mostrar = 'no_validado';
                }
            }
            if(seleccion_filtro_empresa.length > 0 && mostrar != 'no_validado'){
                if(seleccion_filtro_empresa.includes(element.empresa) == true){
                    filtros_puestos.push(element.empresa);
                    mostrar = 'si';
                } else {
                    mostrar = 'no_validado';
                }
            }
            if(seleccion_filtro_publicado.length > 0 && mostrar != 'no_validado'){
                if(seleccion_filtro_publicado.includes(element.publicado) == true){
                    filtros_puestos.push(element.publicado);
                    mostrar = 'si';
                } else {
                    mostrar = 'no_validado';
                }
            }
            if(mostrar == 'si'){
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.promo, element.cantidad, element.id);
            }
        });
        filtro_seleccionado();
        document.getElementById('panel_muestra').innerHTML = html;
    }
}

function filtro_seleccionado(){
    let html    = ''; 
    let result = filtros_puestos.filter((item,index)=>{
        return filtros_puestos.indexOf(item) === index;
    })
    result.forEach(element => {
        html = html + componente_filtro_seleccionado(element)
    });
    document.getElementById('filtros').innerHTML = html;
}

function aplicar_filtro_nombre(){
    filtros_puestos  = [];
    document.getElementById('filtros').innerHTML = '';
    let html   = '';
    let nombre = document.querySelector("input[type='search']").value;
    if(nombre == ''){
        inicio();
    } else {
        listado_de_productos.forEach(element => {
            if(element.nombre.toLowerCase().includes(nombre.toLowerCase())){
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.promo, element.cantidad, element.id)
            }
        });
        filtro_seleccionado();
        document.getElementById('panel_muestra').innerHTML = html;
    }   
}

function consultar_sesion(){
    let html = '';
    let info = new URLSearchParams();
    info.append('tipo_peticion','consulta_sesion');
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        if(data.sesion == true){
            let html = componente_opcion_usuario(data.usuario) + componente_opcion_add_producto() + componente_opcion_carrito(data.carrito);
            console.log('ahora si');
            document.getElementById('opciones_ingreso').innerHTML = html;
        } else {
            document.getElementById('opciones_ingreso').innerHTML = componente_opcion_inicio();
            console.log('aca');
        }
    }).catch(error=>{
        document.getElementById('opciones_ingreso').innerHTML = componente_opcion_inicio();
    })
}   
consultar_sesion();

function registrar_usuario(){
    document.getElementById('mensaje_registrar').innerText = "";

    let correo = document.getElementById('input_correo_registrar').value;
    let clave  = document.getElementById('input_clave_registrar').value;
    let nick   = document.getElementById('input_nick_registrar').value;

    if(correo == '' || clave == '' || nick == ''){
        // alert('Es necesario diligenciar los campos');
        Swal.fire('Es necesario diligenciar los campos')
    } else {
        let info = new URLSearchParams();
        info.append('tipo_peticion','registrar_usuario');
        info.append('correo',correo);
        info.append('clave',clave);
        info.append('nick',nick);
        fetch('controlador/controlador.php',{
            method:'POST',
            body:info
        }).then(res=>res.json()).then(data=>{
            // alert('registro ingresado, pase a la opción "ingresar" y diligencie los datos.');
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro ingresado, pase a la opción "ingresar" y diligencie los datos.',
                showConfirmButton: false
            })
            document.getElementById('input_correo_registrar').value = '';
            document.getElementById('input_clave_registrar').value  = '';
            document.getElementById('input_nick_registrar').value   = '';
        }).catch(error=>{
            document.getElementById('mensaje_registrar').innerText = "error, intenta recargar la pagina e intentar nuevamente.";
        })
    }
}

function ingresar_usuario(){
    let correo = document.getElementById('input_correo').value;
    let clave  = document.getElementById('input_clave').value;   
    if(correo == '' || clave == ''){
        // alert('Es necesario diligenciar los campos');
        Swal.fire('Es necesario diligenciar los campos')
    } else {
        let info = new URLSearchParams();
        info.append('tipo_peticion','ingresar_usuario');
        info.append('correo',correo);
        info.append('clave',clave);
        fetch('controlador/controlador.php',{
            method:'POST',
            body:info
        }).then(res=>res.json()).then(data=>{
            if(data == 'no hay logueo'){
                // alert('Datos incorrectos.');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Datos incorrectos!',
                    footer: 'Detalle de la alerta'
                })
                document.getElementById('clave_errada').innerText = "Datos incorrectos.";
            } else {
                document.getElementById('input_correo').value = '';
                document.getElementById('input_clave').value  = '';
                consultar_sesion();
            }
        }).catch(error=>{
            // alert('Datos incorrectos, error.');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos incorrectos! o ocurrio un error.',
                footer: 'Detalle de la alerta'
            })
            document.getElementById('clave_errada').innerText = "Datos incorrectos, error.";
        })
    }
}

function salir(){
    let info = new URLSearchParams();
    info.append('tipo_peticion','cerrar_sesion');
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        consultar_sesion();
    }).catch(error=>{
        consultar_sesion();
    })
}

function crear_producto() {
    let nombre      = document.getElementById('inputn_nombre').value;
    let tipo        = document.getElementById('inputn_tipo').value;
    let promo     = document.getElementById('inputn_promo').value;
    let cantidad    = document.getElementById('inputn_cantidad').value;
    let valor       = document.getElementById('inputn_valor').value;
    let descripcion = document.getElementById('inputn_descripcion').value;
    let imagen      = document.querySelector('input[type="file"]')

    let info = new FormData();
    info.append('tipo_peticion','crear_producto');
    info.append('nombre',nombre);
    info.append('tipo',tipo);
    info.append('promo',promo);
    info.append('cantidad',cantidad);
    info.append('descripcion',descripcion);
    info.append('valor',valor);
    info.append('imagen', imagen.files[0]);

    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        // alert('Importe realizado');
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Importe realizado.',
            showConfirmButton: false
        })
        document.getElementById('myform').reset();
        inicio();
    }).catch(error=>{
        // alert('Error, producto no creado.');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error, producto no creado.',
            footer: 'Detalle del error.'
        })
    })   
}

function adicionar_carrito(id){
    let info = new URLSearchParams();
    info.append('tipo_peticion','adicionar_carrito');
    info.append('id', id);
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        if(data == 'Producto cargado al carrito'){
            consultar_sesion();  
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data,
                showConfirmButton: false
            })
        } else {
            Swal.fire(data);
        }
        // alert(data);
    }).catch(error=>{
        // alert('error: ' + error);
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: 'Detalle del error.'
        })
    })
}

function descripcion_carta(id){
    listado_de_productos.forEach(element => {
        if(element.id == id){
            document.getElementById('imagen_carta').setAttribute('src', 'caratulas/' + element.imagen);
            document.getElementById('titulo_carta').innerText = element.nombre;
            document.getElementById('Descripcion_carta').innerText = element.descripcion;
            let html = `
                <p>
                    <strong>Tipo:</strong> <br>
                    ${element.tipo}
                </p>
                <p>
                    <strong>promo:</strong> <br>
                    ${element.promo}
                </p>
                <p>
                    <strong>empresa:</strong> <br>
                    ${element.empresa}
                </p>
                <p>
                    <strong>Publicado:</strong> <br>
                    ${element.publicado}
                </p>
                <p>
                    <strong>Fecha:</strong> <br>
                    ${element.fecha}
                </p>
            `
            document.getElementById('detalle_menor_carta').innerHTML = html;
        }       
    });
}

function carrito_compras(){
    document.getElementById('panel_muestra').innerHTML = componente_compra();

    let info = new URLSearchParams();
    info.append('tipo_peticion','consultar_carrito');
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        if(data == 'Debe iniciar sesion primero.'){
            Swal.fire(data);
        } else {
            if(data.length > 0){
                let html       = '';
                let valortotal = 0;
                data.forEach(element => {
                    html = html + `
                    <tr>
                        <td><img src="caratulas/${element.imagen}" alt="imagen del producto" width="20%"> ${element.nombre} | ${element.promo} | ${element.tipo}</td>
                        <td id="celda_valor" style="text-align: center;">$${new Intl.NumberFormat('de-DE', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(element.valor)}</td>
                        <td id="celda_valor" style="text-align: center;">
                            <span style="cursor:pointer;color:red" onclick="eliminar_producto_compra(${element.id})"> Eliminar </span>
                        </td>
                    </tr>
                    `
                    valortotal = valortotal + parseInt(element.valor);
                });
                document.getElementById('tbody_compra').innerHTML = html;
                document.getElementById('div_valor').innerHTML    = '<label>Valor a pagar</label> <br>' + new Intl.NumberFormat('de-DE', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(valortotal);
            }
        }
    }).catch(error=>{
        console.error('No hay productos en el carro');
    })
} 

function eliminar_producto_compra(id){
    let info = new URLSearchParams();
    info.append('tipo_peticion','eliminar_producto_compra');
    info.append('id', id);
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        if(data == 'Producto eliminado del carrito'){
            consultar_sesion();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data,
                showConfirmButton: false
            })
            carrito_compras();
        } else {
            Swal.fire(data);
        }
        // alert(data);
    }).catch(error=>{
        // alert('error: ' + error);
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: 'Detalle del error.'
        })
    })   
}

function finalizar_compra(detalle){
    let info = new URLSearchParams();
    info.append('tipo_peticion','finalizar_compra');
    info.append('detalle', detalle);
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        consultar_sesion();
        Swal.fire(data);
        inicio();
    }).catch(error=>{
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: 'Detalle del error.'
        })
    })
}