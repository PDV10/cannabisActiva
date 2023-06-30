"use strict"

let links = document.querySelectorAll(".link");


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

