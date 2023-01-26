//récupérer l'url du site pour obtenir l'id du produit à afficher ensuite
const str = document.location.href;
const url = new URL(str);

const idCanape = url.searchParams.get('id');
console.log(idCanape)

//fonction pour afficher le Produit dans le html
function afficherProduit(canape) {

var imageCanape = document.createElement("img");
console.log(imageCanape);

const div = document.querySelector("article .item__img");
console.log(div)
div.appendChild(imageCanape);

imageCanape.src = canape.imageUrl;
console.log(imageCanape.src)
imageCanape.alt = canape.altTxt;
console.log(imageCanape.alt)

var nomCanape = document.getElementById("title");
nomCanape.innerText = canape.name;
console.log(canape.name)

var prixCanape = document.getElementById("price");
prixCanape.innerText = canape.price;


var descriptionCanape = document.getElementById("description");
descriptionCanape.innerText = canape.description;
}

// afficher le produit grâce à l'api qui renvoit les données du produit suivant l'id dans l'url
function recupererProduit(str) {

  fetch('http://localhost:3000/api/products/'+idCanape)
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(valeur) {
      console.log(valeur)
      afficherProduit(valeur);

      }
    )
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
 
recupererProduit(str);

