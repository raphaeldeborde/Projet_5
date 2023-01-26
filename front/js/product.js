//récupérer l'url du site pour obtenir l'id du produit à afficher ensuite
const str = document.location.href;
const url = new URL(str);

const idCanape = url.searchParams.get('id');
console.log(idCanape)

//fonction pour afficher le Produit dans le html
function afficherProduit(canape) {

  // récupérer l'image du produit et la placé dans le DOM sous le bon parent
var imageCanape = document.createElement("img");
const div = document.querySelector("article .item__img");
div.appendChild(imageCanape);
imageCanape.src = canape.imageUrl;
imageCanape.alt = canape.altTxt;

//récupérer le nom et le placé dans la balise ayant l'id title
var nomCanape = document.getElementById("title");
nomCanape.innerText = canape.name;
console.log(canape.name)

//récupérer le prix et l'insérer dans la balise ayant l'id prix
var prixCanape = document.getElementById("price");
prixCanape.innerText = canape.price;

//récupérer la description du canapé et l'introduire dans la balise dont l'id est description
var descriptionCanape = document.getElementById("description");
descriptionCanape.innerText = canape.description;

var colors = canape.colors;
var select = document.getElementById("colors")
for (const color of colors) {
  const newOption = document.createElement("option");
  newOption.setAttribute("value", color);
  newOption.innerText = color;
  select.appendChild(newOption);
  }
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

