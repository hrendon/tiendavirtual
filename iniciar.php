<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('controlador/conexion_base.php');

class inicio extends conexion
{   
    function __construct() {
        if($this->con = $this->conectar()){
            echo "listo, conexión realizada"; echo "<br>";
            $this->crear_esquema();
        } else {
            echo "error en la conexión de base de datos";
            die();
        }
    } 

    public function crear_esquema(){
        $query = "CREATE DATABASE $this->dbname;";
        if(mysqli_query($this->con, $query)){
            echo "listo, base creada y seleccionada"; echo "<br>";
            $this->conectar_base();
        } else {
            echo "Alerta, no se creo la base"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
            $this->conectar_base();
        }
    
        
        $query = "CREATE TABLE IF NOT EXISTS tb_usuarios (
            id INT NOT NULL AUTO_INCREMENT,
            correo VARCHAR(70) NOT NULL UNIQUE,
            nick VARCHAR(20) NOT NULL,
            pass VARCHAR(255) NOT NULL,
            carrito INT,
            PRIMARY KEY (id)
        );";
        if(mysqli_query($this->con, $query)){
            echo "listo, tabla tb_usuarios creada"; echo "<br>";    
            $pass = md5('admin');
            $query = "INSERT INTO tb_usuarios (correo,nick,pass, carrito) VALUES 
            ('admin@admin.com', 'admin', '$pass',0);";
            if(!mysqli_query($this->con, $query)){
                echo "Alerta, novedad en la tabla tb_usuarios"; echo "<br>";
                echo mysqli_error($this->con); echo "<br>";    
            }
        } else {
            echo "Error, no se creo la tabla tb_usuarios"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
        }

        $query = "CREATE TABLE IF NOT EXISTS tb_video_juegos (
            id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL UNIQUE,
            descripcion VARCHAR(200),
            tipo VARCHAR(30) NOT NULL,
            consola VARCHAR(30) NOT NULL,
            imagen VARCHAR(50) NOT NULL,
            valor INT NOT NULL,
            PRIMARY KEY (id)
        );";
        if(mysqli_query($this->con, $query)){
            echo "listo, tabla tb_videojuegos creada"; echo "<br>";
            $query = "INSERT INTO tb_video_juegos (nombre,descripcion,tipo,consola,imagen,valor) VALUES 
            ('Fornite', 'Videojuego de accion', 'Accion', 'PlayStation','Fornite.jpg', 10000),
            ('Fifa', 'Videojuego de futbol', 'Futbol', 'XBOX','Fifa.jpg', 20000);";
            if(!mysqli_query($this->con, utf8_decode($query))){
                echo "Alerta, novedad en la tabla tb_videojuegos"; echo "<br>";
                echo mysqli_error($this->con); echo "<br>";    
            }
        } else {
            echo "Error, no se creo la tabla tb_videojuegos"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
        }
        
        $this->con->close();
    }
}
$inicio = new inicio();