console.log('carga archivo script');
var listado_de_videojuevos = [];
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
            alert('Alerta, detalle: ' + data.mensaje);
        } else {
            listado_de_videojuevos = data;
            data.forEach(element => {
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.consola, element.cantidad, element.id)
            });
            document.getElementById('panel_muestra').innerHTML = html;
            // cargar los filtros
            cargar_filtros('tipo', 'filtro_tipo');
            cargar_filtros('consola', 'filtro_consola');
        }
    }).catch(error=>{
        alert('Ha ocurrido un error, detalle: ' + error);
    })
}
inicio();

function cargar_filtros(filtros, section_filtro){
    let html = '';
    let tipo = [];
    listado_de_videojuevos.forEach(element => {
        eval('tipo.push(element.'+filtros+');');
        filtro_seleccionado();
    });
    let result = tipo.filter((item,index)=>{
        return tipo.indexOf(item) === index;
    })
    result.forEach(element => {
       html = html + componente_cargar_filtros(element);
    });
    document.getElementById(section_filtro).innerHTML = html;
}

function aplicar_filtro(){
    document.querySelector("input[type='search']").value = '';
    let html         = '';
    let seleccion    = [];
    filtros_puestos  = [];
    let check_filtro = document.querySelectorAll('.aplicar_filtro_tipo');
    check_filtro.forEach(element => {
        if(element.checked == true){
            seleccion.push(element.value);
        }
    });
    if(seleccion.length == 0){
        inicio();
    } else {
        listado_de_videojuevos.forEach(element => {
            // Filtro por tipo o consola
            if(seleccion.includes(element.tipo) == true && seleccion.includes(element.consola) == true){
                filtros_puestos.push(element.tipo);
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.consola)
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
        listado_de_videojuevos.forEach(element => {
            if(element.nombre.toLowerCase().includes(nombre.toLowerCase())){
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.consola)
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
            let html = componente_opcion_usuario(data.usuario) + componente_opcion_add_videojuego() + componente_opcion_carrito(data.carrito);
            document.getElementById('opciones_ingreso').innerHTML = html;            
        } else {
            document.getElementById('opciones_ingreso').innerHTML = componente_opcion_inicio();
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
        alert('Es necesario diligenciar los campos');
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
            alert('registro ingresado, pase a la opción "ingresar" y diligencie los datos.');
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
        alert('Es necesario diligenciar los campos');
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
                alert('Datos incorrectos.');
                document.getElementById('clave_errada').innerText = "Datos incorrectos.";
            } else {
                document.getElementById('input_correo').value = '';
                document.getElementById('input_clave').value  = '';
                consultar_sesion();
            }
        }).catch(error=>{
            alert('Datos incorrectos, error.');
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

function crear_videojuego() {
    let nombre      = document.getElementById('inputn_nombre').value;
    let tipo        = document.getElementById('inputn_tipo').value;
    let consola     = document.getElementById('inputn_consola').value;
    let cantidad    = document.getElementById('inputn_cantidad').value;
    let valor       = document.getElementById('inputn_valor').value;
    let descripcion = document.getElementById('inputn_descripcion').value;
    let imagen      = document.querySelector('input[type="file"]')

    let info = new FormData();
    info.append('tipo_peticion','crear_videojuego');
    info.append('nombre',nombre);
    info.append('tipo',tipo);
    info.append('consola',consola);
    info.append('cantidad',cantidad);
    info.append('descripcion',descripcion);
    info.append('valor',valor);
    info.append('imagen', imagen.files[0]);

    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        alert('Importe realizado');
        document.getElementById('myform').reset();
        inicio();
    }).catch(error=>{
        alert('Error, videojuego no creado.');
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
        consultar_sesion();
        alert('Agregado al carrito');
    }).catch(error=>{
        alert('error: ' + error);
        console.error(error);
    })
}