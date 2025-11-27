<?php
$mysqli = new mysqli("localhost", "root", "", "parcial2_funko");

if ($mysqli->connect_errno) {
    die("Error de conexión: " . $mysqli->connect_error);
}

$mysqli->set_charset("utf8mb4");