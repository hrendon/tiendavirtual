<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

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

    public function registrar_usuario($POST){
        $correo = $POST['correo'];
        $clave  = md5($POST['clave']);
        $nick   = $POST['nick'];

        $query = "INSERT INTO `tb_usuarios` (correo, nick, pass) VALUES ('$correo', '$nick', '$clave');";
        mysqli_query($this->con, $query);
    }

    public function ingresar_usuario($POST){
        $correo = $POST['correo'];
        $clave  = md5($POST['clave']);

        $query = "SELECT * FROM `tb_usuarios` WHERE correo ='$correo' AND pass ='$clave';";
        $respuesta = mysqli_query($this->con, $query);
        if($respuesta){
            $data = array();
            while($row = mysqli_fetch_array($respuesta)){
                $data[] = $row;
            }
            return $data;
        }
    }

    public function consulta_sesion(){
        $id = $_SESSION['id_usuario'];
        $query = "SELECT SUM(cantidad) as conteo FROM `tb_carrito` WHERE compra_confirmada = 0 AND tb_usuario_id ='$id';";
        $respuesta = mysqli_query($this->con, $query);
        if($respuesta){
            $data = array();
            while($row = mysqli_fetch_array($respuesta)){
                $data[] = $row;
            }
            return $data;
        }
    }
    
    public function crear_videojuego($POST, $imagen){
        $nombre      = $POST['nombre'];
        $tipo        = $POST['tipo'];
        $consola     = $POST['consola'];
        $cantidad    = $POST['cantidad'];
        $descripcion = $POST['descripcion'];
        $valor       = $POST['valor'];

        $query = "INSERT INTO `tb_video_juegos` (nombre, descripcion, tipo, consola, imagen, valor, cantidad) VALUES ('$nombre', '$descripcion', '$tipo', '$consola', '$imagen', '$valor', '$cantidad');";
        mysqli_query($this->con, $query);
    }

    public function adicionar_carrito($POST){
        $id = $POST['id'];
        $id_usuario = $_SESSION['id_usuario'];

        $query = "INSERT INTO `tb_carrito` (tb_video_juego_id, tb_usuario_id, cantidad, compra_confirmada) VALUES ('$id', '$id_usuario', 1, 0);";
        mysqli_query($this->con, $query);
    }
}

$controlador = new controlador();

switch ($_POST['tipo_peticion']) {
    case 'todo_el_listado':
        $respuesta = $controlador->todo_el_listado();
        echo json_encode($respuesta);
        break;

    case 'consulta_sesion':
        $respuesta = $controlador->consulta_sesion();
        if($respuesta[0]['conteo'] == null){
            $respuesta[0]['conteo'] = 0;
        }
        $array = array(
            'sesion' => $_SESSION['session'], 
            'carrito' => $respuesta[0]['conteo'], 
            'usuario' => $_SESSION['nick']
        );
        echo json_encode($array);
        break;
    case 'registrar_usuario':
        $controlador->registrar_usuario($_POST);
        echo json_encode('registro enviado');
        break;
    case 'adicionar_carrito':
        $controlador->adicionar_carrito($_POST);
        echo json_encode('carrito cargado');
        break;
    case 'ingresar_usuario':
        $respuesta = $controlador->ingresar_usuario($_POST);
        if($respuesta == NULL){
            echo json_encode("no hay logueo");   
        } else {
            $_SESSION['session']    = true;
            $_SESSION['id_usuario'] = $respuesta[0]['id'];
            $_SESSION['nick']       = $respuesta[0]['nick'];
            $array = array(
                'sesion' => $_SESSION['session'], 
                'carrito' => 0, 
                'usuario' => $_SESSION['nick']
            );
            echo json_encode($array);
        }
        break;
    case 'cerrar_sesion':
            unset($_SESSION['session']);
            unset($_SESSION['nick']);
            unset($_SESSION['id_usuario']);
            echo json_encode("sesion cerrada.");
        break;
    case 'crear_videojuego':
        if($_SESSION['session']){
            $controlador->crear_videojuego($_POST, $_FILES["imagen"]["name"]);
            
            $target_dir = "../caratulas/";
            $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

            $check = getimagesize($_FILES["imagen"]["tmp_name"]);
            if($check !== false) {
                // el archivo es una imagen
                $uploadOk = 1;
            } else {
                // el archivo no es una imagen
                $uploadOk = 0;
            }
            
            if (file_exists($target_file)) {
                // el archivo ya existe
                $uploadOk = 0;
            }

            if ($_FILES["imagen"]["size"] > 500000) {
                // el archivo es demaciado pesado
                $uploadOk = 0;
            }

            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                // no tiene los formatos permitidos
                $uploadOk = 0;
            }

            if ($uploadOk == 0) {
                // no se importa la imagen
            } else {
                if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
                    // imagen importada
                } else {
                    // imagen no importada
                }
            }
            echo json_encode('importe realizado');
        }     
        break;

    default:
        # code...
        break;
}