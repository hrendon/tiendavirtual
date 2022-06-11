<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('conexion_base.php');
class controlador extends conexion
{
    private $con;
    
    function __construct() {
        try {
            $this->con = $this->conectar('si');
        } catch (\Throwable $th) {
            $array = array('mensaje' => "error en la conexión de base de datos");
            echo json_encode($array);
        }
    }

    public function todo_el_listado(){
        $query = "SELECT * FROM `tb_video_juegos`;";
        $respuesta = mysqli_query($this->con, $query);
        if($respuesta){
            $data = array();
            while($row = mysqli_fetch_array($respuesta)){
                $data[] = $row;
            }
            return $data;
        }
    }
}

$controlador = new controlador();

switch ($_POST['tipo_peticion']) {
    case 'todo_el_listado':
        $respuesta = $controlador->todo_el_listado();
        echo json_encode($respuesta);
        break;

    case 'consulta_sesion':
        // $array = array(
        //     'sesion' => true, 
        //     'carrito' => 0, 
        //     'usuario' => '@hrendon'
        // );
        echo json_encode($array);
        break;

    default:
        # code...
        break;
}