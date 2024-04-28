window.onload = init

const carrito = JSON.parse(localStorage.getItem("carrito")) || {}

function init() {
    const tablaCarrito = document.getElementById("tablaCarrito")
    const subtotal = document.getElementById("subtotal")
    const envio = document.getElementById("costoEnvio")
    const total = document.getElementById("total")

    const btnComprar = document.getElementById("btnComprar")
    const btnSeguir = document.getElementById("btnseguir")

    function initListeners() {
        btnSeguir.addEventListener("click", () => location.href = "/")
    }

    renderTabla(tablaCarrito)
    initListeners()
    updateResumen(subtotal, envio, total)
}

function renderTabla(tabla) {
    let temp =''
    for(const key in carrito ) {
        const prod = carrito[key]
        temp+=`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <img alt="Product Image" class="rounded-lg object-cover" height="80" src="${prod.imagen}" width="80"
                style="aspect-ratio: 80 / 80; object-fit: cover;" />
            </td>
            <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <p class="font-medium">S/. ${prod.precio}</p>
            </td>
            <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div class="space-y-1">
                    <h3 class="font-medium">${prod.nombre}</h3>
                </div>
            </td>
            <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div class="flex items-center gap-2">
                    <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="w-4 h-4">
                        <path d="M5 12h14"></path>
                    </svg>
                    </button>
                    <span>${prod.cantidad}</span>
                    <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="w-4 h-4">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                    </button>
                </div>
            </td>
            <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <p class="font-medium">${prod.precio * prod.cantidad}</p>
            </td>
        </tr>`
    };
  tabla.innerHTML = temp;
}

function updateResumen(subtotal, envio, total){
    const costoEnvio = 20;
    const costoTotal = Object.values(carrito).reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    subtotal.innerHTML = "S/. " + costoTotal
    total.innerHTML = "S/. " + (costoTotal + costoEnvio)
    envio.innerHTML = `S/. ${costoEnvio}`

}