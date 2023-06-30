"use strict"

let links = document.querySelectorAll(".link");

let ancorBuscador = document.getElementById("ancorBuscador").addEventListener("click", (e)=>{
    e.preventDefault();
});

let input = document.getElementById("inputBuscador");
let liBuscador = document.getElementById("liBuscador")

liBuscador.addEventListener("mouseover", ()=>{
    input.classList.remove("esconderInput")
    input.classList.add("expandirInput")
})

liBuscador.addEventListener("mouseleave", ()=>{
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
    }
}

setearListeners();

function limpiarActivo() {
    for (let x of links) {
        if (x.classList.contains("activo")) {
            console.log(x)
            x.classList.remove("activo");
        }
    }
}