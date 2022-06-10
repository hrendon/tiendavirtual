console.log('carga archivo script');
var listado_de_videojuevos = [];

(function () {
    let html = '';
    let info = new URLSearchParams();
    info.append('tipo_peticion','todo_el_listado');
    fetch('controlador/controlador.php',{
        method:'POST',
        body:info
    }).then(res=>res.json()).then(data=>{
        listado_de_videojuevos = data;
        data.forEach(element => {
            html = html + componente_descripcion(element.nombre, element.imagen, element.descripcion, element.tipo, element.valor)
        });
        document.getElementById('panel_muestra').innerHTML = html;
        // cargar los filtros
        cargar_filtros();
    }).catch(error=>{
        alert('Ha ocurrido un error, detalle: ' + error);
    })
})();

function cargar_filtros(){
    let html = '';
    let tipo = [];
    // separo los tipos unicos
    listado_de_videojuevos.forEach(element => {
        tipo.push(element.tipo);
    });
    let result = tipo.filter((item,index)=>{
        return tipo.indexOf(item) === index;
    })
    result.forEach(element => {
       html = html + `
       <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="idChek_${element}">
            <label class="form-check-label" for="idChek_${element}">
                <span class="badge bg-success">${element}</span>
            </label>
        </div>
       ` 
    });
    document.getElementById('filtro_tipo').innerHTML = html;
}