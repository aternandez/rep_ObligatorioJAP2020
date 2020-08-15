//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*document.addEventListener("DOMContentLoaded", function(e){

});
*/
    function validarCampos(){
        let user = document.getElementById("user").value;
        let pass = document.getElementById("password").value;

    if (user.trim() === "" || pass.trim() === "") {
        alert("Ingrese sus datos para acceder a su cuenta.");
    } else{
        location.href = "cover.html";
    }
}