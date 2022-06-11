<?php
class conexion
{
    private $con     = ''; 
    private $hostname = "localhost";
    private $username = "root";
    private $password = "Nacional2022**";
    public  $dbname   = "tiendavirtual";

    public function conectar($base=""){
        $mysqli = mysqli_connect($this->hostname,$this->username,$this->password);
        if(!$mysqli){
            echo "no hay conexión con la base de datos, ingresa a controlador/conexion_base.php y configura las credenciales de mysql";
            die();
        }
        $this->con = $mysqli;
        if($base=='si'){
            $this->conectar_base();
        }
        return $this->con;
    }
    public function conectar_base(){
        return mysqli_select_db( $this->con, $this->dbname);
    }
}