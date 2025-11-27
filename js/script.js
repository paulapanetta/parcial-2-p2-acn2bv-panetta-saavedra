const API = "api.php";
let currentPage = 1;

function cargarItems() {
    const nombre = document.querySelector("[name='nombre']").value;
    const categoria = document.querySelector("[name='categoria']").value;

    fetch(`${API}?action=listar&nombre=${nombre}&categoria=${categoria}&pagina=${currentPage}`)
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
                <img src="${i.imagen}">
                <h3>${i.nombre}</h3>
                <p>${i.descripcion}</p>
                <p><strong>${i.categoria}</strong></p>

                <button onclick="editar(${i.id_funko})">Editar</button>
                <button class="eliminar" onclick="eliminar(${i.id_funko})">Eliminar</button>
            </div>
        `;
    });
}

function renderPagination(info) {
    const p = document.getElementById("pagination");
    p.innerHTML = "";

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

document.getElementById("formAgregar").addEventListener("submit", e => {
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
        frm.set("id_funko", "");
        cargarItems();
    });
});

function editar(id) {
    fetch(`${API}?action=listar&pagina=1`)
        .then(r => r.json())
        .then(data => {
            const item = data.items.find(i => i.id_funko == id);
            if (!item) return;

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
        showCancelButton: true,
        confirmButtonText: "Sí"
    }).then(res => {
        if (res.isConfirmed) {
            const fd = new FormData();
            fd.append("id_funko", id);

            fetch(API + "?action=eliminar", {
                method: "POST",
                body: fd
            })
            .then(r => r.json())
            .then(() => {
                Swal.fire("Eliminado", "", "success");
                cargarItems();
            });
        }
    });
}

cargarItems();