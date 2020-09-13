// --- constantes para ejecutar funciones de orden --- //

const ORDER_ASC_BY_COST = "cost -> COST";
const ORDER_DESC_BY_COST = "COST -> cost";
const ORDER_DESC_BY_SOLDCOUNT = "SOLDCOUNT -> SoldCount";

var minCost = undefined;
var maxCost = undefined;

var buscar = undefined;


var carsArray = [];

function sortCars(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            return 0;

        });
    } else if (ORDER_DESC_BY_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let car = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(car.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(car.cost) <= maxCost))) {



            if ((buscar == undefined || car.name.toLowerCase().indexOf(buscar) != -1) ||
                (buscar == undefined || car.description.toLowerCase().indexOf(buscar) != -1)) {





                htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + car.imgSrc + `" alt="` + car.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ car.name + " - " + car.currency + " " + car.cost + `</h4>
                            <small class="text-muted">` + car.soldCount + ` vendidos</small>
                            
                        </div>
                        <div>
                            <p> `+ car.description + `</p> 
                        </div>
                    </div>
                </div>
                
            </div>
            `
            }
        }

        document.getElementById("list-container").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(carsArray);
        }
    });

    // -- addEventListener para llamar funcion de filtro al clickear el botón de filtro --//
    document.getElementById("filtrar").addEventListener("click", function () {

        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showCategoriesList(carsArray);
    });

    // -- addEventListener para llamar funcion de limpiar filtro al clickear el botón de limpiar filtro --//

    document.getElementById("limpiar-filtro").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showCategoriesList(carsArray);
    });

    // addEventListener para llamar funcion sort al clickear el botón de orden

    document.getElementById("sortCostAsc").addEventListener("click", function () {
        carsArray = sortCars(ORDER_ASC_BY_COST, carsArray);

        showCategoriesList(carsArray);
    });

    document.getElementById("sortCostDesc").addEventListener("click", function () {
        carsArray = sortCars(ORDER_DESC_BY_COST, carsArray);

        showCategoriesList(carsArray);
    });

    document.getElementById("sortSoldCount").addEventListener("click", function () {
        carsArray = sortCars(ORDER_DESC_BY_SOLDCOUNT, carsArray);

        showCategoriesList(carsArray);
    });

    // addEventListener para llamar funcion buscar 
    document.getElementById("buscador").addEventListener('input', function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        showCategoriesList(carsArray);

    });

    // addEventListener para limpiar barra de búsqueda 
    document.getElementById("limpiar-busqueda").addEventListener("click", function () {
        document.getElementById("buscador").value = "";

        buscar = undefined;

        showCategoriesList(carsArray);

    });

    // addEventListener para redirigir a product-info.html
    document.getElementById("list-container").addEventListener("click", function() {
        window.location = "product-info.html";

    });
});