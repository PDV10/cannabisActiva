"use strict";

let USER_ADMIN = {
    nombre: "admin",
    apellido: "admin",
    email: "admin@admin.com",
    contraseña: "admin"
}

let USER_X = {
    nombre: "Lionel Andres",
    apellido: "Messi",
    email: "LeoMessi@gmail.com",
    contraseña: "fulbo"
}

let users = [USER_X, USER_ADMIN];
let session = false;
let links = document.querySelectorAll(".link");

let ancorBuscador = document.getElementById("ancorBuscador").addEventListener("click", (e) => {
    e.preventDefault();
});

let input = document.getElementById("inputBuscador");
let liBuscador = document.getElementById("liBuscador")

liBuscador.addEventListener("mouseover", () => {
    input.classList.remove("esconderInput")
    input.classList.add("expandirInput")
})

liBuscador.addEventListener("mouseleave", () => {
    input.classList.add("esconderInput")
    input.classList.remove("expandirInput")
})

console.log(links)

function setearListeners() {

    for (let x of links) {
        x.addEventListener("click", () => {
            limpiarActivo();
            x.classList.add("activo");
        })

        x.addEventListener("", () => {
            limpiarActivo();
            x.classList.add("activo");
        })
    }
}

setearListeners();

function limpiarActivo() {
    for (let x of links) {
        if (x.classList.contains("activo")) {
            x.classList.remove("activo");
        }
    }
}

/*--------------------------------- MANEJO DE FORMULARIOS ---------------------------------*/
let btnShowLogin = document.getElementById("login");

const alertLogin = document.getElementById('alerta-login');
const alertaRegistro = document.getElementById("alerta-registro");

let btnRegister = document.getElementById("btn-registrarse");
let formRegistro = document.getElementById("form-registro");

/*INPUTS DE LOGIN*/

let formLogin = document.getElementById("form-login");
let btnLogin = document.getElementById("btn-logearse");
let inputLogEmail = document.getElementById("input-log-email");
let inputRegEmail = document.getElementById("input-reg-email");
let flagEmail = false;
let inputLogPass = document.getElementById("input-log-password");
let inputRegPass = document.getElementById("input-reg-password");
let inputRegRePass = document.getElementById("input-reg-repassword");
let flagContraseña = false;
let listaNav = document.getElementById("lista-nav");

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    let flagNewUserValido = true;
    users.forEach(user => {
        if (inputRegEmail.value == user.email) {
            console.log("email no disponible")
            appendAlert('Error, email no disponible. Intentelo de nuevo...', 'danger', alertaRegistro);
            flagNewUserValido = false;
        }
    });
    if (flagNewUserValido && inputRegPass.value != inputRegRePass.value) {
        appendAlert('Error, las contraseñas no son iguales. Intentalo de nuevo...', 'danger', alertaRegistro)
        flagNewUserValido = false;
        return
    }

    if (flagNewUserValido) {
        let newUser = {
            nombre: document.getElementById("input-name").value,
            apellido: document.getElementById("input-lastname").value,
            email: inputRegEmail.value,
            contraseña: inputRegPass.value
        }
        users.push(newUser)
        activateSession(newUser);
        document.getElementById("btn-reg-close").click();
    }

});

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    users.forEach(user => {
        if (inputLogEmail.value == user.email) {
            flagEmail = true;
            if (inputLogPass.value == user.contraseña) {
                flagContraseña = true;
                session = true;
                activateSession(user);

                
                /*
                ACA DEBERIAMOS INFORMAR AL USUARIO CON UN COMENTARIO EN PANTALLA 
                CRAR UN P ESTILIZADO PARA INFORMAR AL USUARIO
                */
                inputLogEmail.value = "";
                inputLogPass.value = "";
                document.getElementById("btn-log-close").click();
            }
        }

    });

    if (!flagEmail || !flagContraseña) {
        appendAlert('Error, email o contraseña incorrecto. Intentelo de nuevo...', 'danger', alertLogin);
    }


    flagEmail = false;
    flagContraseña = false;
});

function activateSession(user) {
    if(user.nombre ==  "admin"){
        agregarItem();
    }
    let a = btnShowLogin.firstChild;
    btnShowLogin.removeChild(a);
    btnShowLogin.innerHTML = `<a href="index.html">Cierra Sesion <span class="activo">${user.nombre}</span></a>`;

    btnShowLogin.addEventListener("click", (e) => {

        if (session)
            desactivateSession();
    })
}

function desactivateSession() {
    btnShowLogin = document.getElementById("login");
    let a = btnShowLogin.firstChild;
    btnShowLogin.removeChild(a);
    btnShowLogin.innerHTML = `<a>Inicia Sesion</a>`;
}

function agregarItem(){
    let li = document.createElement("li")
    li.classList.add("items-nav") 
    li.setAttribute("data-bs-toggle","modal");
    li.setAttribute("data-bs-target","#modalTabla")
    let a = document.createElement("a")
    a.setAttribute("id","administradorUsuarios") 
    a.innerHTML= "Gestion Usuarios";
    a.classList.add("link")
    li.appendChild(a);
    listaNav.insertBefore(li, document.querySelector(".linkInicio"));
    console.log(li);
}

let btnGuardar = document.getElementById("btnGuardarTabla").addEventListener("click", (e)=>{
    let divMensaje = document.getElementById("msjTabla");
    let p = document.createElement("p");
    p.classList.add("fuente-primaria");
    
    p.innerHTML = "Configuracion guardada";
    divMensaje.innerHTML = "";
    divMensaje.appendChild(p);
    setTimeout(() => {
        divMensaje.removeChild(p);
    }, 2000);
})
/*--------------------------------- MANSAJE DE ALERTA ---------------------------------*/



const wrapper = document.createElement('div');
const appendAlert = (message, type, section) => {

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    section.classList.remove("oculto");
    section.classList.add("visible");

    section.append(wrapper)

    setTimeout(() => {
        section.classList.remove("visible");
        section.classList.add("oculto");
        section.innerHTML = "";
    }, 5000);
}
