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
            PRIMARY KEY (id)
        );";
        if(mysqli_query($this->con, $query)){
            echo "listo, tabla tb_usuarios creada"; echo "<br>";    
            $pass = md5('admin');
            $query = "INSERT INTO tb_usuarios (correo,nick,pass) VALUES 
            ('admin@admin.com', 'admin', '$pass');";
            if(!mysqli_query($this->con, $query)){
                echo "Alerta, novedad en la tabla tb_usuarios"; echo "<br>";
                echo mysqli_error($this->con); echo "<br>";    
            }
        } else {
            echo "Error, no se creo la tabla tb_usuarios"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
        }

        $query = "CREATE TABLE IF NOT EXISTS tb_productos (
            id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL UNIQUE,
            descripcion TEXT,
            tipo VARCHAR(30) NOT NULL,
            promo VARCHAR(30) NOT NULL,
            imagen VARCHAR(50) NOT NULL,
            valor INT NOT NULL,
            cantidad INT NOT NULL,
            empresa VARCHAR(100),
            publicado VARCHAR(100),
            fecha VARCHAR(100),
            PRIMARY KEY (id)
        );";
        if(mysqli_query($this->con, $query)){
            echo "listo, tabla tb_productos creada"; echo "<br>";
        } else {
            echo "Error, no se creo la tabla tb_productos"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
        }

        $query = "CREATE TABLE IF NOT EXISTS tb_carrito (
            id INT NOT NULL AUTO_INCREMENT,
            tb_producto_id INT,
            tb_usuario_id INT,
            cantidad VARCHAR(200),
            compra_confirmada INT,
            PRIMARY KEY (id)
        );";
        if(mysqli_query($this->con, $query)){
            echo "listo, tabla tb_carrito creada"; echo "<br>";
        } else {
            echo "Error, no se creo la tabla tb_carrito"; echo "<br>";
            echo mysqli_error($this->con); echo "<br>";
        }
        
        $this->con->close();
    }
}
$inicio = new inicio();