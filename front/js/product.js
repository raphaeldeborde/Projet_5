var str = window.location.search

function recupererId (str) {
  
  var url = new URL(str);
  var idCanape = url.searchParams.get("name");
  return idCanape;
}

function insererLesDonnees(canape) {

var imageCanape = document.createElement("img");
let baliseDivItemImg = document.getElementByClass("item_img");
baliseDivItemImg.appendChild(imageCanape);
imageCanape.src = canape.imageUrl;
imageCanape.alt = canape.altTxt;

var nomCanape = document.getElementById("title");
var contenu_1 = document.createTextNode(canape.name);
nomCanape.appendChild(contenu_1);

var prixCanape = document.getElementById("price");
var contenu_2 = document.createTextNode(canape.price);
prixCanape.appendChild(contenu_2);

var descriptionCanape = document.getElementById("description");
var contenu_3 = document.createTextNode(canape.description);
descriptionCanape.appendChild(contenu_3);
}

function DonneesDesId() {
fetch("http://localhost:3000/api/products")
.then(function(reponse) {
  if (reponse.ok) {
    return reponse.json();
  }
})
.then(function(canapes) {
  
  for (let canape in canapes) {
    if (recupererId(str).json == canape._id) {
      insererLesDonnees(canape)
    }
 }  
})
.catch(function(err) {
  // Une erreur est survenue
});  
}
        
DonneesDesId()

