window.onload = init

let modalAgregar;

function init(){
    load_productos()

    const btnAddProd = document.getElementById("btn-add-prod")
    const formAddProd = document.getElementById("form-add-prod")

    modalAgregar = document.getElementById("modalAgregar")
    const preview = document.getElementById("preview")
    const imgPreview = document.getElementById("img")
    const inputImg = document.getElementById("inputImg")

    function initListeners(){
        btnAddProd.addEventListener("click",  ()=>modalAgregar.showModal())
        formAddProd.addEventListener("submit", addProd)

        document.body.addEventListener("click", e => {
            if(e.target.id == "btn-close"){
                modalAgregar.close()
            }
        })
        preview.addEventListener("dragover", (e)=> {
            e.preventDefault()
            preview.classList.add("bg-black/50")
        })
        preview.addEventListener("dragleave", (e)=> {
            e.preventDefault()
            preview.classList.remove("bg-black/50")
        })
        preview.addEventListener("drop", (e) => {
            e.preventDefault()
            console.log(e.dataTransfer.files[0])
            preview.classList.remove("bg-black/50")
            const fileReader = new FileReader()
            fileReader.addEventListener('load', ()=> {
                imgPreview.classList.remove("hidden")
                imgPreview.src = fileReader.result
            })
            fileReader.readAsDataURL(e.dataTransfer.files[0])
            inputImg.files = e.dataTransfer.files
        })
    }

    initListeners()
    
}

function addProd(e){
    e.preventDefault()
    const data = new FormData(e.target)

    const prod = { 
        nombre: data.get("nombre"),
        descripcion: data.get("descripcion"),
        precio: data.get("precio"),
        img: data.get("img") 
    }

    const url = "/api/v1/productos/crear"

    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: data
    })
    .then(res => res.json())
    .then(data => {
        modalAgregar.close()
        if(data.error){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error
            })
        }else{
            Swal.fire({
                icon: "success",
                text: "Producto agregado correctamente"
            })
            load_productos()
        }
    })
}

function load_productos(){
    fetch("/api/v1/productos/listar", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        const tabla = document.getElementById("tableProductos")
        render_productos(tabla, data)
    })
}

function render_productos(tabla, productos){
    let temp = ''
    productos.forEach(prod => {
        temp += `<tr id="${prod.uuid}" class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          <img src="${prod.imagen}" width="40" height="40" alt="Product image"
            class="aspect-square rounded-md object-cover" />
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${prod.nombre}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-semibold">S/.${prod.precio}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 flex justify-end">
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-emerald-400 h-10 w-10 mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="w-4 h-4">
              <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
            </svg>
            <span class="sr-only">Edit</span>
          </button>
          <button
            onclick="delete_producto(this, '${prod.uuid}')"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-rose-500 h-10 w-10 mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="w-4 h-4">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            <span class="sr-only">Delete</span>
          </button>
        </td>
      </tr>`
    });
    tabla.innerHTML = temp
}

function delete_producto(e, uuid){
    const fila = e.parentNode.parentNode
    fila.classList.add("hidden")

    const url = `/api/v1/productos/eliminar/${uuid}`
    fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.status)
            fila.remove()
        else {
            fila.classList.remove("hidden")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
    })
}