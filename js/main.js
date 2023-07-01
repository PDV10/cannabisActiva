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


let btnRegister = document.getElementById("btn-registrarse");
let formRegistro = document.getElementById("form-registro");

/*INPUTS DE LOGIN*/

let formLogin = document.getElementById("form-login");
let btnLogin = document.getElementById("btn-logearse");
let inputLogEmail = document.getElementById("input-log-email");
let flagEmail = false;
let inputLogPass = document.getElementById("input-log-password");
let flagContraseña = false;

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit form registro " + e.target)
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
        appendAlert('Error, email o contraseña incorrecto. Intentelo de nuevo...', 'danger', 'login');
    }


    flagEmail = false;
    flagContraseña = false;
});

function activateSession(user) {

    let a = btnShowLogin.firstChild;
    btnShowLogin.removeChild(a);
    btnShowLogin.innerHTML = `<a href="index.html">Cierra Sesion ${user.nombre}</a>`;

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
/*--------------------------------- MANSAJE DE ALERTA ---------------------------------*/

const alertLoginHelper = document.getElementById('alerta-login');
const alertRegisterHelper = document.getElementById('alerta-registro');
const wrapper = document.createElement('div');
const appendAlert = (message, type, section) => {

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertLoginHelper.classList.remove("oculto");
    alertLoginHelper.classList.add("visible");

    alertLoginHelper.append(wrapper)

    setTimeout(() => {
        alertLoginHelper.classList.remove("visible");
        alertLoginHelper.classList.add("oculto");
        alertLoginHelper.removeChild(wrapper);
    }, 5000);
}
