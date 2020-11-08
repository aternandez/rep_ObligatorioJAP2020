//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let perfil = localStorage.getItem('perfil');

    if (perfil){
        perfil = JSON.parse(perfil);

        if (perfil.imgUrl !=""){
            document.getElementById("imgPerfil").src = perfil.imgUrl;
        }

        document.getElementById("imgUrl").value = perfil.imgUrl;
        document.getElementById("nombres").value = perfil.nombres;
        document.getElementById("apellidos").value = perfil.apellidos;
        document.getElementById("edad").value = perfil.edad;
        document.getElementById("email").value = perfil.email;
        document.getElementById("telefono").value = perfil.telefono;
    }

    document.getElementById("guardar").addEventListener("click", function (e){
        let passedValidation = true;
        let imgUrl = document.getElementById("imgUrl");
        let nombres = document.getElementById("nombres");
        let apellidos = document.getElementById("apellidos");
        let edad = document.getElementById("edad");
        let email = document.getElementById("email");
        let telefono = document.getElementById("telefono");

        if (nombres.value === ''){
            nombres.classList.add("is-invalid");
            passedValidation = false;
        } else {
            nombres.classList.remove("is-invalid");
        }

        if (apellidos.value === ''){
            apellidos.classList.add("is-invalid");
            passedValidation = false;
        } else {
            apellidos.classList.remove("is-invalid");
        }

        if (email.value === ''){
            email.classList.add("is-invalid");
            passedValidation = false;
        } else {
            email.classList.remove("is-invalid");
        }

        if (edad.value === ''){
            edad.classList.add("is-invalid");
            passedValidation = false;
        } else {
            edad.classList.remove("is-invalid");
        }

        if (telefono.value === ''){
            telefono.classList.add("is-invalid");
            passedValidation = false;
        } else {
            telefono.classList.remove("is-invalid");
        }

        if(passedValidation) {
            localStorage.setItem('perfil', JSON.stringify({
                nombres: nombres.value,
                apellidos: apellidos.value,
                edad: edad.value,
                imgUrl: imgUrl.value,
                email: email.value,
                telefono: telefono.value,
            }));
            window.location ="my-profile.html"
        }

    });

    document.getElementById("limpiar").addEventListener("click", function (e){
        localStorage.removeItem('perfil');
        window.location ="my-profile.html";

    });

 
});