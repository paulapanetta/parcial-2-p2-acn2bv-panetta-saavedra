const API = "api.php";
let currentPage = 1;

function getUrlParams() {
    return new URLSearchParams(window.location.search);
}

function updateUrlParams(paramsObj) {
    const url = new URL(window.location.href);
    Object.keys(paramsObj).forEach(k => {
        if (paramsObj[k] === null || paramsObj[k] === "") {
            url.searchParams.delete(k);
        } else {
            url.searchParams.set(k, paramsObj[k]);
        }
    });
    history.replaceState(null, "", url.toString());
}

function syncInputsFromUrl() {
    const params = getUrlParams();
    const nombre = params.get("nombre") ?? "";
    const categoria = params.get("categoria") ?? "";
    const pagina = parseInt(params.get("pagina") ?? "1", 10) || 1;

    document.querySelector("[name='nombre']").value = nombre;
    document.querySelector("[name='categoria']").value = categoria;
    currentPage = pagina;
}

function cargarItems() {

    const nombre = document.querySelector("[name='nombre']").value;
    const categoria = document.querySelector("[name='categoria']").value;

    updateUrlParams({ nombre: nombre, categoria: categoria, pagina: currentPage });

    const sinFiltros = (nombre === "" && categoria === "");
    const limit = sinFiltros ? "&limit=99999" : "";   

    const url = `${API}?action=listar&nombre=${nombre}&categoria=${categoria}&pagina=${currentPage}${limit}`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            renderItems(data.items);
            renderPagination(data.pagination);
        });
        
}

function renderItems(items) {
    const cont = document.getElementById("itemsContainer");
    cont.innerHTML = "";

    items.forEach(i => {
        cont.innerHTML += `
            <div class="card">
                <div class="img-wrap">
                    <img src="${i.imagen}" alt="${escapeHtml(i.nombre)}" onerror="this.src='img/logo_funko.svg'">
                </div>

                <div class="card-body">
                    <div>
                        <h3>${escapeHtml(i.nombre)}</h3>
                        <p>${escapeHtml(i.descripcion)}</p>
                        <p><strong>${escapeHtml(i.categoria)}</strong></p>
                    </div>

                    <div class="card-actions">
                        <button onclick="editar(${i.id_funko})">Editar</button>
                        <button class="eliminar" onclick="eliminar(${i.id_funko})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderPagination(info) {
    const p = document.getElementById("paginacion");
    p.innerHTML = "";

    if (info.pages <= 1) return;

    for (let i = 1; i <= info.pages; i++) {
        p.innerHTML += `
            <button ${i === info.page ? "disabled" : ""} onclick="cambiarPagina(${i})">${i}</button>
        `;
    }
}

function cambiarPagina(num) {
    currentPage = num;
    cargarItems();
}

document.getElementById("btnFiltrar").addEventListener("click", () => {
    currentPage = 1;
    cargarItems();
});

const formAgregar = document.getElementById("formAgregar");
if (formAgregar) {
    formAgregar.addEventListener("submit", e => {
        e.preventDefault();
        const frm = new FormData(e.target);
        const id = frm.get("id_funko");

        fetch(API + "?action=" + (id ? "editar" : "agregar"), {
            method: "POST",
            body: frm
        })
        .then(r => r.json())
        .then(res => {
            if (res.error) return Swal.fire("Error", res.error, "error");
            Swal.fire("Listo", id ? "Editado correctamente" : "Agregado correctamente", "success");
            e.target.reset();
            currentPage = 1;
            cargarItems();
        });
    });
}

function editar(id) {

    fetch(`${API}?action=obtener&id=${id}`)
        .then(r => r.json())
        .then(item => {

            document.querySelector("[name='id_funko']").value = item.id_funko;
            document.querySelector("[name='nombre']").value = item.nombre;
            document.querySelector("[name='categoria']").value = item.categoria;
            document.querySelector("[name='imagen']").value = item.imagen;
            document.querySelector("[name='descripcion']").value = item.descripcion;

            window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
        });
}

function eliminar(id) {
    Swal.fire({
        title: "¿Eliminar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar"
    }).then(res => {
        if (!res.isConfirmed) return;
        const fd = new FormData();
        fd.append("id_funko", id);

        fetch(API + "?action=eliminar", {
            method: "POST",
            body: fd
        })
        .then(r => r.json())
        .then(() => {
            Swal.fire("Eliminado", "", "success");
            currentPage = 1;
            cargarItems();
        });
    });
}

function escapeHtml(str = "") {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

window.addEventListener("DOMContentLoaded", () => {
    syncInputsFromUrl(); 
    cargarItems(); 
}); 