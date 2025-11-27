<?php
$tema = $_GET["tema"] ?? "claro";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>FunkoPop Store – Parcial 2</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="<?= $tema ?>">
<header>
    <img src="img/logo_funko.svg" alt="Logo Funko">
    <nav>
        <a href="#productos">Productos</a>
        <a href="#contacto">Contacto</a>
    </nav>
</header>

<section class="funko">
    <h2>Descubrí la colección más épica de Funkos</h2>
</section>

<div>
    <h2 class="section-title" id="productos">Colección Destacada</h2>
<div>

<div class="filtros-container">
    <label>Tema:</label>
    <select id="temaSelect">
        <option value="claro" <?= $tema === "claro" ? "selected" : "" ?>>Claro</option>
        <option value="oscuro" <?= $tema === "oscuro" ? "selected" : "" ?>>Oscuro</option>
    </select>

    <input type="text" name="nombre" placeholder="Buscar por nombre...">

    <select name="categoria">
        <option value="">Todas</option>
        <option value="Series">Series</option>
        <option value="Peliculas">Películas</option>
        <option value="Anime">Anime</option>
    </select>

    <button id="btnFiltrar">Filtrar</button>
</div>

<section class="productos" id="itemsContainer"></section>

<div id="paginacion"></div>

<section style="padding:6px 40px;">
    <h3>Agregar o Editar Funko</h3>

    <form id="formAgregar">
        <input type="hidden" name="id_funko">

        <input required name="nombre" placeholder="Nombre del funko">
        <input required name="categoria" placeholder="Categoría (Series / Peliculas / Anime)">
        <input required name="imagen" placeholder="URL de imagen local ej: img/eleven.png">
        <textarea required name="descripcion" placeholder="Descripción"></textarea>

        <button type="submit">Guardar</button>
    </form>
</section>

<footer id="contacto">
    © 2025 FunkoPop Store — Parcial 2
</footer>

<script src="js/script.js"></script>

<script>
document.getElementById("temaSelect").addEventListener("change", (e) => {
    const tema = e.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set("tema", tema);
    window.location.href = url;
});
</script>

</body>
</html>