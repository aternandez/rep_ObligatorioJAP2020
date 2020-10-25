//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    let loginNeed = localStorage.getItem('login-need');

    if (loginNeed) {
        loginNeed = JSON.parse(loginNeed);
        document.getElementById("alert").innerHTML = `

        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span id="msg">${loginNeed.msg}</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
    }

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
            localStorage.setItem("User-Logged", JSON.stringify({ user: inputUser.value }));
            if (loginNeed) {
                localStorage.removeItem('login-need');
                window.location = loginNeed.from;
            } else {
                window.location = 'cover.html';
            }
        } else {
            alert("Ingrese usuario y contraseña para acceder a su cuenta.");
        }
    });
});