//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto = {};
var comentariosArray = [];

function showProducts (producto, arrayComments) {
    let info ="";
    let imgs = "";
    let comments ="<hr>";



    info += `

                    <div class="list-group-item list-group-item-action">
                            <h4 class="mb-1">${producto.name} ${producto.cost} ${producto.currency}</h4><br>
                            <p>${producto.description}</p>
                            <p>-Total de unidades vendidas: ${producto.soldCount}
                            <p>-Categoría: ${producto.category}</p>
                    </div>
                    <br><br>
                    `;

    imgs += `

                    <img class="img" src="${producto.images[0]}" width="265px" height="215px" alt="">
                    <img class="img" src="${producto.images[1]}" width="265px" height="215px" alt="">
                    <img class="img" src="${producto.images[2]}" width="265px" height="215px" alt="">
                    <img class="img" src="${producto.images[3]}" width="265px" height="215px" alt="">
                    <img class="img" src="${producto.images[4]}" width="265px" height="215px" alt="">
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

    });
    
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok"){
            producto = resultObj.data;

            showProducts(producto, comentariosArray);
        }

    });
    
    //mostrar campo de comentario si hay usuario logueado
    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("nuevoComentario").style = "display: inline-block";
        document.getElementById("queresComentar").style="display: none";
    }

    //no mostar link inicio de sesion si hay usuario logueado

    
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

});