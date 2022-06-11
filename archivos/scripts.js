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
                html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor, element.consola)
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
            if(seleccion.includes(element.tipo) == true || seleccion.includes(element.consola) == true){
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
            let html = componente_opcion_usuario(data.usuario) + componente_opcion_carrito(data.carrito) + componente_opcion_add_videojuego();
            document.getElementById('opciones_ingreso').innerHTML = html;            
        } else {
            document.getElementById('opciones_ingreso').innerHTML = componente_opcion_inicio();
        }
    }).catch(error=>{
        document.getElementById('opciones_ingreso').innerHTML = componente_opcion_inicio();
    })
}
consultar_sesion();