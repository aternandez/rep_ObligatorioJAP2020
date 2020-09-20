//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submit").addEventListener("click", function (e) {

    let inputUser = document.getElementById("inputUser");
    let inputPasword = document.getElementById("password");
    let validarCampos = true;

    if (inputUser.value === "") {
        validarCampos = false;
    }

    if (inputPasword.value === "") {
        validarCampos = false;
    }

    if (validarCampos) {
        localStorage.setItem("User-Logged", JSON.stringify({ user: inputUser.value}));
        window.location = 'cover.html';
    } else {
        alert ("Ingrese usuario y contraseña para acceder a su cuenta.");
    }

    });

    




});


/*
function validarCampos() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("password").value;

    if (user.trim() === "" || pass.trim() === "") {
        alert("Ingrese sus datos para acceder a su cuenta.");
    } else {
        window.location = "cover.html";
        

    }

    if (validarCampos) {
        localStorage.setItem("user-logged", JSON.stringify({ email: inputUser.value}));

    }
}*/


