var str = window.location.href;

function afficherProduit (canape) {

var imageCanape = document.createElement("img");
let baliseDivItemImg = document.getElementByClass("item__img");
baliseDivItemImg.appendChild(imageCanape);
imageCanape.src = canape.imageUrl;
imageCanape.alt = canape.altTxt;

var nomCanape = document.getElementById(title);
var contenuTitre = document.createTextNode(canape.name);
nomCanape.appendChild(contenuTitre);

var prixCanape = document.getElementById("price");
var contenuPrix = document.createTextNode(canape.price);
prixCanape.appendChild(contenuPrix);

var descriptionCanape = document.getElementById("description");
var contenuDescription = document.createTextNode(canape.description);
descriptionCanape.appendChild(contenuDescription);
}

function recupererProduit(str) {

  var url = new URL(str);
  var idCanape = url.searchParams.get("name");
  let newIdCanape = idCanape.replace(/%20€/g, '');


  fetch(`http://localhost:3000/api/products/${newIdCanape}`)
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(valeur) {
      
      afficherProduit(valeur);

      }
    )
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
 
recupererProduit(str);

