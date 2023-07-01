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
let userActivo;
let session = false;
let links = document.querySelectorAll(".link");

let ancorBuscador = document.getElementById("ancorBuscador");
if (ancorBuscador != null) {
    ancorBuscador.addEventListener("click", (e) => {
        e.preventDefault();
    });
}

let input = document.getElementById("inputBuscador");
let liBuscador = document.getElementById("liBuscador")

if (liBuscador != null) {
    liBuscador.addEventListener("mouseover", () => {
        input.classList.remove("esconderInput")
        input.classList.add("expandirInput")
    })

    liBuscador.addEventListener("mouseleave", () => {
        input.classList.add("esconderInput")
        input.classList.remove("expandirInput")
    })
}

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
    activarResponder();
    if (user.nombre == "admin") {
        agregarItem();
        agregarBtnsComentarios();
    }
    let a = btnShowLogin.firstChild;
    userActivo = user;
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
    session = false;
}

function agregarItem() {
    let li = document.createElement("li")
    li.classList.add("items-navMobile")
    li.setAttribute("data-bs-toggle", "modal");
    li.setAttribute("data-bs-target", "#modalTabla")
    let a = document.createElement("a")
    a.setAttribute("id", "administradorUsuarios")
    a.innerHTML = "Gestion Usuarios";
    a.classList.add("link")
    li.appendChild(a);
    listaNav.insertBefore(li, document.querySelector(".linkInicio"));
}

let btnGuardar = document.getElementById("btnGuardarTabla").addEventListener("click", (e) => {
    let divMensaje = document.getElementById("msjTabla");
    // let p = document.createElement("p");
    // p.classList.add("fuente-primaria");

    // p.innerHTML = "Configuracion guardada";
    // divMensaje.innerHTML = "";
    // divMensaje.appendChild(p);
    // setTimeout(() => {
    //     divMensaje.removeChild(p);
    // }, 2000);
    appendAlert("Configuracion guardada", "success", divMensaje)
})
/*--------------------------------- MANSAJE DE ALERTA FORMULARIOS---------------------------------*/



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

/* --------------------------- MENSAJE CONSULTA --------------------------------*/
let btnConsulta = document.getElementById("btn-consulta");
let msgConsulta = document.getElementById("msjConsulta");
if (btnConsulta) {

    btnConsulta.addEventListener("click", (e) => {
        e.preventDefault();
        let inputConsulta = document.getElementById("input-contact-message");
        let inputConsultaEmail = document.getElementById("input-contact-email");
        let inputConsultaNombre = document.getElementById("input-contact-name");
        let formContact = document.getElementById("form-contacto");
        if (inputConsulta.value != "" && inputConsultaEmail.value != "" && inputConsultaNombre.value != "") {
            appendAlert("Enviado con exito", "success", msgConsulta);
            inputConsultaNombre.value = "";
            inputConsulta.value = "";
            inputConsultaEmail.value = "";
            formContact.classList.remove("was-validated");
        } else {
            appendAlert("Faltan datos requeridos", "danger", msgConsulta);
            formContact.classList.add("was-validated");
        }


    })
}

let btnComentar = document.getElementById("btn-comentar");

if (btnComentar != null) {

    btnComentar.addEventListener("click", (e) => {
        if (!session) {
            document.getElementById("login").click();
        } else {
            let inpComentar = document.getElementById("input-comentar");
            let cajaComentarios = document.getElementById("caja-comentarios");
            let comentario = inpComentar.value;
            inpComentar.value = "";
            let card = `<div class="card p-1 w-100 mt-3">
                             <div class="header-comentario card-header d-flex gap-3 align-items-center justify-content-between">
                                <div class="d-flex gap-3 align-items-center">
                                    <div class="img-perfil-sm"></div>
                                        <h5>${userActivo.nombre}</h5>
                                    </div>
                                    <button class="oculto btn btn-danger position-relative rigth-0 top-0">X</button>
                                </div>
                            <div class="card-body">
                            <p>${comentario}</p>
                        </div>
                        <div class="card-footer">

                        <div class="form-floating">
                            <textarea disabled class="form-control" placeholder="Leave a comment here"
                                id="floatingTextarea"></textarea>
                            <label for="floatingTextarea"> Responder</label>
                        </div>
                            </div>
                        </div>`;
            if (comentario != "") {
                cajaComentarios.innerHTML += card;
            } else {
                let msjComentario = document.getElementById("msjComentario");
                appendAlert("Escribe primero el comentario...", "danger", msjComentario)
            }
        }
    })
}

function agregarBtnsComentarios() {
    let btnsEliminar = document.querySelectorAll(".btn-eliminar");
    for (let x of btnsEliminar) {
        x.classList.remove("oculto")
    }
}

function activarResponder() {
    let linkNoticias = document.getElementById("linkNoticias");
    if (linkNoticias.classList.contains("activo")) {
        let inputsResponder = document.querySelectorAll(".inputResponder");
        for (let y of inputsResponder) {
            y.disabled = false;
        }
    }

}
