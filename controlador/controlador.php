<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

// class controlador {

// }

switch ($_POST['tipo_peticion']) {
    case 'todo_el_listado':
        $array = array(
            array(
                'nombre' => 'Fornite',
                'imagen' => 'fornite.jpg',
                'descripcion' => 'Videojuego mas popular',
                'tipo' => 'battle royale',
                'valor' => 10000
            ),
            array(
                'nombre' => 'Fifa',
                'imagen' => 'fifa.jpg',
                'descripcion' => 'Videojuego de futbol',
                'tipo' => 'futbol',
                'valor' => 20000
            )
        );
        echo json_encode($array);
        break;
    
    default:
        # code...
        break;
}