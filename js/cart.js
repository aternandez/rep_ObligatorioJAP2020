const CART2_INFO_URL=" https://japdevdep.github.io/ecommerce-api/cart/654.json";

var articlesArray = [];

function calculoTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
}

function calculoSubtotal(unitCost, i){
    let cantidad = parseInt(document.getElementById(`count${i}`).value);
    subtotal = cantidad * unitCost;
    document.getElementById(`articuloSubtotal${i}`).innerHTML = subtotal;
    calculoTotal();
}

function convertirMoneda(currency, unitCost){
    if (currency === "UYU"){
        return unitCost / 40;
    }else{
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
                <td><img src='${article.src}' width="50px"> ${article.name}</td>

                <td>${article.currency} ${article.unitCost}</td>

                <td><input style="width:45px;" onchange="calculoSubtotal(${article.unitCost}, ${i})" 
                    type="number" id="count${i}" value="${article.count}" min="1"></td>

                <td><span class="subtotal" id="articuloSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
            </tr>
        `

        document.getElementById("listado").innerHTML = contenido;
    }
    calculoTotal();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART2_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articlesArray = resultObj.data.articles;

            showArticles(articlesArray);
        }
    });
});