<?php
// error_reporting(E_ALL);
// ini_set('display_errors', '1');

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
        $query = "SELECT * FROM `tb_productos`;";
        $respuesta = mysqli_query($this->con, $query);
        if($respuesta){
            $data = array();
            while($row = mysqli_fetch_array($respuesta)){
                $data[] = $row;
            }
            foreach ($data as $key => $value) {
                $data2[] = array_map("utf8_encode", $value);
            }
            return  $data2;
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

    public function consultar_carrito(){
        $id = $_SESSION['id_usuario'];
        $query = "SELECT * FROM `tb_carrito`, `tb_productos` WHERE tb_carrito.tb_producto_id = tb_productos.id AND tb_carrito.compra_confirmada = 0 AND tb_usuario_id = $id";
        $respuesta = mysqli_query($this->con, $query);
        if($respuesta){
            $data = array();
            while($row = mysqli_fetch_array($respuesta)){
                $data[] = $row;
            }
            foreach ($data as $key => $value) {
                $data2[] = array_map("utf8_encode", $value);
            }
            return  $data2;
        }
    }
    
    public function crear_producto($POST, $imagen){
        $nombre      = $POST['nombre'];
        $tipo        = $POST['tipo'];
        $promo     = $POST['promo'];
        $cantidad    = $POST['cantidad'];
        $descripcion = $POST['descripcion'];
        $valor       = $POST['valor'];

        $query = "INSERT INTO `tb_productos` (nombre, descripcion, tipo, promo, imagen, valor, cantidad) VALUES ('$nombre', '$descripcion', '$tipo', '$promo', '$imagen', '$valor', '$cantidad');";
        mysqli_query($this->con, $query);
    }

    public function adicionar_carrito($POST){
        $id = $POST['id'];
        $id_usuario = $_SESSION['id_usuario'];

        $query = "INSERT INTO `tb_carrito` (tb_producto_id, tb_usuario_id, cantidad, compra_confirmada) VALUES ('$id', '$id_usuario', 1, 0);";
        mysqli_query($this->con, $query);
    }

    public function eliminar_producto_compra($POST){
        $id = $POST['id'];
        $id_usuario = $_SESSION['id_usuario'];

        $query = "DELETE FROM `tb_carrito` WHERE tb_producto_id = $id AND tb_usuario_id = $id_usuario AND compra_confirmada = 0;";
        mysqli_query($this->con, $query);
    }

    public function finalizar_compra($POST){
        $detalle    = $POST['detalle'];
        $id_usuario = $_SESSION['id_usuario'];

        if($detalle == 'comprar'){
            $query = "UPDATE `tb_productos`
            inner join `tb_carrito` on `tb_carrito`.tb_producto_id = `tb_productos`.id AND `tb_carrito`.compra_confirmada = 0 AND tb_usuario_id = $id_usuario
            set `tb_productos`.cantidad = `tb_productos`.cantidad - 1";
            
            mysqli_query($this->con, $query);    
            $query = "UPDATE `tb_carrito` SET compra_confirmada = 1 WHERE tb_usuario_id = $id_usuario AND compra_confirmada = 0;";
        } else {
            $query = "DELETE FROM `tb_carrito` WHERE tb_usuario_id = $id_usuario AND compra_confirmada = 0;";
        }
        mysqli_query($this->con, $query);
    }
}

$controlador = new controlador();

switch ($_POST['tipo_peticion']) {
    case 'todo_el_listado':
        $respuesta = $controlador->todo_el_listado();
        echo json_encode($respuesta);
        break;
    case 'consultar_carrito':
        if(isset($_SESSION['session'])){
            $respuesta = $controlador->consultar_carrito();
            echo json_encode($respuesta);
        } else {
            echo json_encode('Debe iniciar sesion primero.');
        }
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
        if(isset($_SESSION['session'])){
            $controlador->adicionar_carrito($_POST);
            echo json_encode('Producto cargado al carrito');
        } else {
            echo json_encode('Debe iniciar sesion primero.');
        }
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
    case 'crear_producto':
        if(isset($_SESSION['session'])){
            $controlador->crear_producto($_POST, $_FILES["imagen"]["name"]);
            
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
    case 'eliminar_producto_compra':
        if(isset($_SESSION['session'])){
            $controlador->eliminar_producto_compra($_POST);
            echo json_encode('Producto eliminado del carrito');
        } else {
            echo json_encode('Debe iniciar sesion primero.');
        }
        break;
    case 'finalizar_compra':
        if(isset($_SESSION['session'])){
            $controlador->finalizar_compra($_POST);
            if($_POST['detalle'] == 'comprar'){
                echo json_encode('Compra finalizada.');
            } else {
                echo json_encode('Compra cancelada.');
            }
        } else {
            echo json_encode('Debe iniciar sesion primero.');
        }
        break;

    default:
        # code...
        break;
}