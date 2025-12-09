<?php
error_reporting(E_ERROR | E_PARSE);
ini_set("display_errors", 0);

header("Content-Type: application/json; charset=utf-8");
require "db/db.php";

$action = $_GET["action"] ?? "listar";

if ($action === "listar") {

    $nombre = $_GET["nombre"] ?? "";
    $categoria = $_GET["categoria"] ?? "";
    $pagina = intval($_GET["pagina"] ?? 1);
    $porPagina = 5;
    $offset = ($pagina - 1) * $porPagina;

    $where = "WHERE 1=1";
    $params = [];
    $types = "";

    if ($nombre !== "") {
        $where .= " AND nombre LIKE ?";
        $params[] = "%$nombre%";
        $types .= "s";
    }

    if ($categoria !== "") {
        $where .= " AND categoria = ?";
        $params[] = $categoria;
        $types .= "s";
    }

    $sqlCount = "SELECT COUNT(*) AS total FROM funko $where";
    $stmt = $mysqli->prepare($sqlCount);
    if ($params) $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $total = $stmt->get_result()->fetch_assoc()["total"];
    $pages = ceil($total / $porPagina);

    $sql = "SELECT * FROM funko $where LIMIT $porPagina OFFSET $offset";
    $stmt2 = $mysqli->prepare($sql);

    if ($params) {
        $stmt2->bind_param($types, ...$params);
    }

    $stmt2->execute();
    $items = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
        "items" => $items,
        "pagination" => [
            "page" => $pagina,
            "pages" => $pages,
            "total" => $total
        ]
    ]);
    exit;
}

if ($action === "agregar") {

    $nombre = $_POST["nombre"] ?? "";
    $categoria = $_POST["categoria"] ?? "";
    $descripcion = $_POST["descripcion"] ?? "";
    $imagen = $_POST["imagen"] ?? "";

    if (!$nombre || !$categoria || !$descripcion || !$imagen) {
        echo json_encode(["error" => "Faltan datos"]);
        exit;
    }

    if (strlen($nombre) < 3) {
        echo json_encode(["error" => "El nombre debe tener al menos 3 caracteres"]);
        exit;
    }

    $validCats = ["Series", "Peliculas", "Anime"];
    if (!in_array($categoria, $validCats)) {
        echo json_encode(["error" => "Categoría inválida"]);
        exit;
    }

    if (!preg_match("/\.(png|jpg|jpeg)$/i", $imagen)) {
        echo json_encode(["error" => "Imagen inválida (solo PNG o JPG)"]);
        exit;
    }

    $sql = "INSERT INTO funko (nombre, categoria, descripcion, imagen) VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ssss", $nombre, $categoria, $descripcion, $imagen);
    $stmt->execute();

    echo json_encode(["success" => true]);
    exit;
}

if ($action === "eliminar") {
    $id = intval($_POST["id_funko"] ?? 0);

    if ($id <= 0) {
        echo json_encode(["error" => "ID inválido"]);
        exit;
    }

    $check = $mysqli->prepare("SELECT id_funko FROM funko WHERE id_funko = ?");
    $check->bind_param("i", $id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows === 0) {
    echo json_encode(["error" => "El ítem no existe"]);
        exit;
    }

    $sql = "DELETE FROM funko WHERE id_funko = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["success" => true]);
    exit;
}

if ($action === "editar") {

    $id = intval($_POST["id_funko"] ?? 0);
    $nombre = $_POST["nombre"] ?? "";
    $categoria = $_POST["categoria"] ?? "";
    $descripcion = $_POST["descripcion"] ?? "";
    $imagen = $_POST["imagen"] ?? "";

    if (!$id || !$nombre || !$categoria || !$descripcion || !$imagen) {
        echo json_encode(["error" => "Datos incompletos"]);
        exit;
    }

    if (strlen($nombre) < 3) {
        echo json_encode(["error" => "El nombre debe tener al menos 3 caracteres"]);
        exit;
    }

    $validCats = ["Series", "Peliculas", "Anime"];
    if (!in_array($categoria, $validCats)) {
        echo json_encode(["error" => "Categoría inválida"]);
        exit;
    }

    if (!preg_match("/\.(png|jpg|jpeg)$/i", $imagen)) {
        echo json_encode(["error" => "Imagen inválida (solo PNG o JPG)"]);
        exit;
    }

    $check = $mysqli->prepare("SELECT id_funko FROM funko WHERE id_funko = ?");
    $check->bind_param("i", $id);
    $check->execute();

    if ($check->get_result()->num_rows === 0) {
        echo json_encode(["error" => "El ítem no existe"]);
        exit;
    }

    $sql = "UPDATE funko SET nombre=?, categoria=?, descripcion=?, imagen=? WHERE id_funko=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $categoria, $descripcion, $imagen, $id);
    $stmt->execute();

    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["error" => "Acción inválida"]);