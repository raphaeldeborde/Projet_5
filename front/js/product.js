//récupéreration de l'url du site pour obtenir l'id du produit
const  addressePage= document.location.href;
const url = new URL(addressePage);
const idCanape = url.searchParams.get('id');

//fonction pour afficher le Produit dans le html
function afficherProduit(canape) {

  // récupérer l'image du produit et la placé dans le DOM sous le bon parent
let imageCanape = document.createElement("img");
const div = document.querySelector("article .item__img");
div.appendChild(imageCanape);
imageCanape.src = canape.imageUrl;
imageCanape.alt = canape.altTxt;

//récupérer le nom et le placé dans la balise ayant l'id title
let nomCanape = document.getElementById("title");
nomCanape.innerText = canape.name;

//récupérer le prix et l'insérer dans la balise ayant l'id prix
let prixCanape = document.getElementById("price");
prixCanape.innerText = canape.price;

//récupérer la description du canapé et l'introduire dans la balise dont l'id est description
let descriptionCanape = document.getElementById("description");
descriptionCanape.innerText = canape.description;

// récupérer les couleurs et les insérer séparément
let couleurs = canape.colors;

for (const couleur of couleurs) {
  const optionCouleur = document.createElement("option");
  optionCouleur.setAttribute("value", couleur);
  optionCouleur.innerText = couleur;
  selectionCouleur.appendChild(optionCouleur);
  }
}
// récupérer le Canapé par l'id grâce à l'API
function recupererProduit(addressePage) {

  fetch('http://localhost:3000/api/products/'+idCanape)
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(valeur) {
      afficherProduit(valeur);

      }
    )
    .catch(function(err){
// Une erreur est survenue;
    }) 
  }

  
/**
 * Type des paramètres récupéré par le biais de l'API
 * @params {String} name
 * @params {Number} price
 * @params {String} imageUrl
 * @params {String} description
 * @params {Array} colors (Array of Strings)
 * @params {String} altTxt
 */

recupererProduit(addressePage);


const boutonPanier = document.getElementById("addToCart");
const selectionCouleur = document.getElementById("colors")

boutonPanier.addEventListener('click',() => {

  let couleurChoisie = selectionCouleur.value;
  let inputQuantite = document.getElementById("quantity");
  let quantite = inputQuantite.value;
  
  

  if (couleurChoisie == "" && (quantite < 1 || quantite > 100)) {
    appliquerUnStyle(selectionCouleur, "red",2, inputQuantite, "red", 2);
    alert("Merci de choisir une couleur et un nombre de canapé (entre 1 et 100)");
  }
else if (couleurChoisie == "") {
  appliquerUnStyle(selectionCouleur, "red", 2, inputQuantite, "black", 1);
  alert("Merci de choisir une couleur pour votre canapé");
  }
else if (quantite < 1 || quantite > 100) {
  if (quantite > 100) {
    alert("Merci de choisir un nombre de canape inférieur à 100");
  }
  else {
    alert("Merci de choisir un nombre de canapé supérieur à 0");
  }
  appliquerUnStyle(selectionCouleur, "black", 1, inputQuantite, "red", 2);
}
else  {
  appliquerUnStyle(selectionCouleur, "black", 1, inputQuantite, "black", 1);
  
   
  // Récupération des données canapés dans le localStorage
  let canapes = JSON.parse(window.localStorage.getItem("produitCanapes"));
  insererAuPanier(canapes)
}
})

function insererAuPanier(canapes) {

  let inputQuantite = document.getElementById("quantity");
  let quantite = inputQuantite.value;
  let couleurChoisie = selectionCouleur.value;
  let name = document.getElementById("title");
  let imageUrl = document.querySelector("article .item__img img").src;
  let description = document.getElementById("description");
  let altTxt = document.querySelector("article .item__img img").alt
  
  let produitCanape = {
    idProduit:idCanape,
    nomProduit:name,
    couleurProduit:couleurChoisie,
    quantiteProduit:quantite,
    imageProduit:imageUrl,
    descriptionProduit:description,
    altProduit:altTxt,
  };
  
  if (canapes == null || canapes.length == 0) {
    canapes=[];
    canapes.push(produitCanape);
    window.localStorage.setItem("produitCanapes",JSON.stringify(canapes));
    alert("Le panier est ouvert");
  }
  else {
    const indice = canapes.findIndex(can => can.idProduit == produitCanape.idProduit && can.couleurProduit == produitCanape.couleurProduit);
    if ((indice !== -1))  {
      let nouvelleQuantite = Number(canapes[indice].quantiteProduit) + Number(quantite);
      if (nouvelleQuantite < 101 && nouvelleQuantite > 1) {
        let memeProduit={
          idProduit:idCanape,
          nomProduit:name,
          couleurProduit:couleurChoisie,
          quantiteProduit:nouvelleQuantite,
          imageProduit:imageUrl,
          descriptionProduit:description,
          altProduit:altTxt,
        }
        canapes.splice(indice, 1,memeProduit);
        window.localStorage.setItem("produitCanapes",JSON.stringify(canapes));
        alert("Le nombre de canapé souhaité a été augmenté");
      }
      else {
        alert("Le nombre de canapé ne peut être supérieur à 100 ou inférieur à 0 dans le panier.")
      }
    }

    else {
      canapes.push(produitCanape);
      window.localStorage.setItem("produitCanapes",JSON.stringify(canapes));
      alert("Votre produit a été rajouté au panier");
    }
  }
}
/**
* La fonction appliquerUnStyle donne un style aux boutons couleurs et quantité
* @params {Object} element1
* @params {String} couleur1
* @params {Number} taille1
* @params {Object} element2
* @params {String} couleur2
* @params {Number} taille2
*/

function appliquerUnStyle(element1, couleur1, taille1, element2, couleur2, taille2) {
    element1.style.borderColor = couleur1;
    element1.style.borderWidth = `${taille1}px`;
    element2.style.borderColor = couleur2;
    element2.style.borderWidth = `${taille2}px`;
}