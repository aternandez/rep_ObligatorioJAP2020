//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto = {};
var comentariosArray = [];
var productosArray = [];

function showRelatedProducts(arrayListado, arrayRelaccionados) {
    let contenido = "<br>";

    arrayRelaccionados.forEach(function(i){
        contenido += `
                           
                            <div class="list-group-item list-group-item-action">
                                <div class="row">
                                        <div class="col-3">
                                            <img src="${arrayListado[i].imgSrc}" alt="${arrayListado[i].description}" class="img-thumbnail">
                                        </div>
                                        <div class="col">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h4 class="mb-1">${arrayListado[i].name} - ${arrayListado[i].currency} ${arrayListado[i].cost} </h4>
                                                <small class="text-muted"> ${arrayListado[i].soldCount} vendidos</small>    
                                            </div>
                                            <div>
                                                <p> ${arrayListado[i].description}</p> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                        `;
        
    });

    document.getElementById("relacionados").innerHTML = contenido;

}

function showProducts (producto, arrayComments) {
    let info ="";
    let imgs = "";
    let comments ="<hr>";



    
    imgs += `


                    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-interval="2000">
                                <img src="${producto.images[0]}" class="d-block w-100" alt="">
                            </div>
                            <div class="carousel-item" data-interval="2000">
                                <img src="${producto.images[1]}" class="d-block w-100" alt="">
                            </div>
                            <div class="carousel-item" data-interval="2000">
                                <img src="${producto.images[2]}" class="d-block w-100" alt="">
                            </div>
                            <div class="carousel-item" data-interval="2000">
                                <img src="${producto.images[3]}" class="d-block w-100" alt="">
                            </div>
                            <div class="carousel-item" data-interval="2000">
                                <img src="${producto.images[4]}" class="d-block w-100" alt="">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
  

                    <br><br>
                    `;

                
    info += `

                    <div class="list-group-item list-group-item-action">
                            <h4 class="mb-1">${producto.name} ${producto.cost} ${producto.currency}</h4><br>
                            <p>${producto.description}</p>
                            <p>-Total de unidades vendidas: ${producto.soldCount}
                            <p>-Categoría: ${producto.category}</p>
                    </div>
                    <br><br>
                    `;


    arrayComments.forEach(function (comment) {
        let puntos = "";

            comments += `
                                <strong>${comment.user}</strong> dijo:<br>
                                <p>${comment.description}</p>
                                `;

            for (let i = 1; i <= comment.score; i++) {
                puntos += `<span class="fa fa-star checked"></span>`;
            }

            for (let i = comment.score + 1; i <= 5; i++) {
                puntos += `<span class="fa fa-star"></span>`;
            }

            comments += `<sub>${comment.dateTime}</sub><br>`;

            comments += `<div style="text-align: left;">${puntos}</div><br><hr>`;
        });

    document.getElementById("productos").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;

}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj){
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
            if (resultObj.status === "ok"){
                producto = resultObj.data;
    
                showProducts(producto, comentariosArray);
            }
    
            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    productosArray = resultObj.data;
        
                    showRelatedProducts(productosArray, producto.relatedProducts);
                }
            });
        });
    });
    
    


    
    
    //mostrar campo de comentario si hay usuario logueado
    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("nuevoComentario").style = "display: inline-block";
        document.getElementById("queresComentar").style="display: none";
    }
    
    //mostrar comentario en pantalla con fecha y hora
    document.getElementById("enviarComentario").addEventListener("click", function () {
        let now = new Date();
            
        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        var starScore = document.getElementsByName('rating');
        let newScore;
        for (var i = 0; i < starScore.length; i++) {
            if (starScore[i].checked) {
                newScore = parseInt(starScore[i].value);
            }
        }

        let nuevoComentario = {
            score: newScore,
            description: document.getElementById('newComment').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).user,
            dateTime: dateTime
        };

        if (nuevoComentario) {
            document.getElementById("newComment").value ="";
            document.getElementsByName("rating").value = "";
            
        }
    
        comentariosArray.push(nuevoComentario);
        showProducts(producto, comentariosArray);   
    
    }); 


    // addEventListener para ir a información del producto seleccionado (en este caso solo recarga product-info.html)
    document.getElementById("relacionados").addEventListener("click", function() {
        window.location = "product-info.html";

    });

});