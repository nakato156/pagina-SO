window.onload = init

function init(){
    const productos = document.querySelectorAll(".addCarrito")

    function initListeners(){
        productos.forEach(producto => {
            producto.addEventListener("click", (e) => {
                const card = e.target.parentElement
                const prod = {
                    id: card.parentElement.id,
                    nombre: card.getAttribute("nombre"),
                    precio: card.getAttribute("precio"),
                    cantidad: 1
                }
                addCarrito(prod)
            })
        })
    }

    initListeners()
}

function addCarrito(prod){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {}
    if (carrito[prod.id]){
        carrito[prod.id].cantidad++
    }else {
        carrito[prod.id] = prod
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
}