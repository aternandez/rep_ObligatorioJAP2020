//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

var carsArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let car = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + car.imgSrc + `" alt="` + car.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ car.name + car.currency + car.cost + `</h4>
                        <p> ` + car.soldCount + `</p> 
                        
                    </div>
                    <div>
                        <p> `+ car.description + `</p> 
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(carsArray);
        }
    });
});