window.onload = init
loader = null
function init(){
    const form = document.getElementById("formLogin")
    loader = document.getElementById("loader")

    form.addEventListener("submit", login)
}

function login(e){
    e.preventDefault()
    loader.showModal()

    const data = new FormData(this)
    
    fetch("/admin/login", {
        method: "POST",
        body: data,
    })
    .then(res => res.json())
    .then(data => {
        loader.close()
        if(data.token){
            localStorage.setItem("token", data.token)
            window.location.href = "/admin"
            return
        }
        Swal.fire({
            icon: 'error',
            title: data.error ?? 'Credenciales incorrectas'
        })
    })
}
