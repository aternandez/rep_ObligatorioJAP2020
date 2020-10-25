const CART2_INFO_URL = " https://japdevdep.github.io/ecommerce-api/cart/654.json";

var articlesArray = [];

function calculoTotal() {
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calculoEnvio();
}

function calculoSubtotal(unitCost, i) {
    let cantidad = parseInt(document.getElementById(`count${i}`).value);
    subtotal = cantidad * unitCost;
    document.getElementById(`articuloSubtotal${i}`).innerHTML = subtotal;
    calculoTotal();
}

function convertirMoneda(currency, unitCost) {
    if (currency === "UYU") {
        return unitCost / 40;
    } else {
        return unitCost;
    }
}

function showArticles(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {

        let article = array[i];

        let costoDolares = convertirMoneda(article.currency, article.unitCost);

        let sub = article.count * costoDolares;

        contenido += `

            <tr>
                <td><button class="btn btn-danger" onclick="eliminar(${i})">&times;</button></td>

                <td><img src='${article.src}' width="50px"> ${article.name}</td>

                <td>${article.currency} ${article.unitCost}</td>

                <td><input style="width:45px;" onchange="calculoSubtotal(${costoDolares}, ${i})" 
                    type="number" id="count${i}" value="${article.count}" min="1"></td>

                <td><span class="subtotal" id="articuloSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
            </tr>
        `

        document.getElementById("listado").innerHTML = contenido;
    }
    calculoTotal();
}

function eliminar(i) {
    if (articlesArray.length > 1) {
        articlesArray.splice(i, 1);
        showArticles(articlesArray);
    } else {
        document.getElementById("compra").innerHTML =
            `
                    <br><br><br>
                    <div class="alert alert-warning" role="alert" style="float:left;">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4>Su carrito está vacío.</h4>
                        <p>Vea más productos disponibles <a href="products.html">aquí</a></p>
                    </div>
                                    
        `;
        document.getElementById("needs-validation").classList.add("d-none")
    }
}

function pagoElegido() {
    var formaPago = document.getElementsByName("formaPago");
    for (var i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && (formaPago[i].value) == "1") {
            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosTransferencia").classList.add("d-none");
        } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
            document.getElementById("datosTarjeta").classList.add("d-none");
            document.getElementById("datosTransferencia").classList.remove("d-none");
        }
    }
}


function pagoCorrecto() {
    let numeroTarjeta = document.getElementById("numeroTarjeta").value;
    let titularTarjeta = document.getElementById("titularTarjeta").value;
    let vencimientoTarjeta = document.getElementById("vencimientoTarjeta").value;
    let seguridadTarjeta = document.getElementById("seguridadTarjeta").value;
    let titularCuenta = document.getElementById("titularCuenta").value;
    let numeroCuenta = document.getElementById("numeroCuenta").value;
    let formaPago = document.getElementsByName("formaPago");
    let pagoOK = true;

    for (var i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && (formaPago[i].value) == "1") {
            if (numeroTarjeta === "" || titularTarjeta === "" || vencimientoTarjeta === "" || seguridadTarjeta === ""){
                pagoOK = false;
            } else {
                pagoOK = true;
            }

        } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
            if (numeroCuenta === "" || titularCuenta === ""){
                pagoOK = false;
            } else {
                pagoOK = true;
            }
        }
    }
    return pagoOK;
}

function calculoEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elementos = document.getElementsByName("envio");
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            envio = parseInt(elementos[i].value) * total / 100;
        }
    }

    let totalConEnvio = total + envio;

    let contenido = `
            <tr>
                <td>U$S ${total}</td>
                <td>U$S ${envio}</td>
                <td id="miTotal">U$S ${totalConEnvio}</td>
            </tr>
    `
    document.getElementById("totalEnvio").innerHTML = contenido;
}

function ok() {
    window.location = "cover.html"
}

document.addEventListener("DOMContentLoaded", function (e) {

    let userLogged = localStorage.getItem('User-Logged');
    if (!userLogged) {
        localStorage.setItem('login-need', JSON.stringify({
            from: "cart.html",
            msg: "Debes ingresar a tu cuenta para realizar una compra"
        }));
        window.location = "index.html"
    }

    getJSONData(CART2_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articlesArray = resultObj.data.articles;

            showArticles(articlesArray);
            calculoEnvio();
        }
    });

    let elementos = document.getElementsByName("envio");
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener("change", function () {
            calculoEnvio();
        });
    }

    let tipoPago = document.getElementsByName("formaPago");
    for (var i = 0; i < tipoPago.length; i++) {
        tipoPago[i].addEventListener("change", function () {
            pagoElegido();
        });
    }

    let form = document.getElementById('needs-validation');

    form.addEventListener('submit', function (e) {
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            if (pagoCorrecto()) {
                document.getElementById("botonPagar").classList.remove("btn-primary");
                document.getElementById("botonPagar").classList.remove("btn-danger");
                document.getElementById("botonPagar").classList.add("btn-success");
                document.getElementById("pagar").innerHTML = `
                    <div class="alert alert-success alert-dismissible show" role="alert">
                        <p>Forma de pago ingresada correctamente</p>
                        <button type="button" class="close" data-dismiss="alert">&times</button>
                    </div>
                    `;
            } else {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("botonPagar").classList.remove("bt-primary");
                document.getElementById("botonPagar").classList.remove("btn-success");
                document.getElementById("botonPagar").classList.add("btn-danger");
                document.getElementById("pagar").innerHTML = `
                    <div class="alert alert-danger alert-dismissible show" role="alert">
                        <p>Debe ingresar una forma de pago para continuar</p>
                        <button type="button" class="close" data-dismiss="alert">&times</button>
                    </div>
                    `;
            }

        } else {
            if (pagoCorrecto()) {
                document.getElementById("pagar").innerHTML = `
                    <div class="alert alert-success alert-dismissible show" role="alert">
                        <p>¡Felicidades! Su compra ha sido realizada con éxito.</p>
                        <button type="button" class="close" data-dismiss="alert">&times</button>
                    </div>
                `;
                
            } else {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("botonPagar").classList.remove("bt-primary");
                document.getElementById("botonPagar").classList.remove("btn-success");
                document.getElementById("botonPagar").classList.add("btn-danger");
                document.getElementById("pagar").innerHTML = `
                    <div class="alert alert-danger alert-dismissible show" role="alert">
                        <p>Debe ingresar una forma de pago para continuar></p>
                        <button type="button" class="close" data-dismiss="alert">&times</button>
                    </div>
                    `;
            }
        }
        form.classList.add('was-validated');
    });
});