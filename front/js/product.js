let name, price, imageUrl, description, colors, altTxt;

const idCanape = url.searchParams.get('id');
const selectionCouleur = document.getElementById("colors")
const boutonPanier = document.getElementById("addToCart")

//récupéreration de l'url du site pour obtenir l'id du produit
const  addressePage= document.location.href;
const url = new URL(addressePage);

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

//récupérer le prix et l'insérer dans la balise ayant l'id prix
var prixCanape = document.getElementById("price");
prixCanape.innerText = canape.price;

//récupérer la description du canapé et l'introduire dans la balise dont l'id est description
var descriptionCanape = document.getElementById("description");
descriptionCanape.innerText = canape.description;

// récupérer les couleurs et les insérer séparément
var couleurs = canape.colors;

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
      console.log(valeur)
      afficherProduit(valeur);

      }
    )
    .catch(function(erreur) {
      // Une erreur est survenue
    });
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

boutonPanier.addEventListener('click',() => {
  const couleurChoisie = selectionCouleur.value;
  const inputQuantite = document.getElementById("quantity");
  const quantite = inputQuantite.value;
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
  
  const idCouleur = couleurChoisie + idCanape;
  const produitCanape = {
    idCouleurProduit:idCouleur,
    idProduit:idCanape,
    nomProduit:name,
    couleurProduit:couleurChoisie,
    quantiteProduit:quantite,
    prix:price,
    imageProduit:imageUrl,
    descriptionProduit:altTxt,
  }
  // Récupération des données canapés dans le localStorage
  let canapeLocalStorage = JSON.parse(localStorage.getItem("produitCanapes"));
  
  if (canapeLocalStorage) {
    //Trouver la place du canapé à la couleur choisie
    const index = canapeLocalStorage.findIndex(element => element.idCouleur == idCouleurProduit) 
    //la quantité est changé si le canapé à la couleur choisie est déjà dans le localStorage
    if (index=!-1) {
     const nouvelleQuantite = Number(quantite) + Number(canapeLocalStorage[index].quantiteProduit)
     const NouveauProduit = {
      idCouleurProduit:idCouleur,
      idProduit:idCanape,
      nomProduit:nomCanape,
      couleurProduit:couleurChoisie,
      quantiteProduit:nouvelleQuantite,
      prix:price,
      imageProduit:imageUrl,
      descriptionProduit:altTxt,
     }
      canapeLocalStorage.splice("produitCanape",NouveauProduit);
    }
  //sinon le canapé est ajouté au tableau
  else {
    canapeLocalStorage.push(produitCanape);
  }
}

else {
  canapeLocalStorage=[];
  canapeLocalStorage.push(produitCanape);
}
//ajouter le tableau des canapés choisies au localStorage

localStorage.setItem("produits",JSON.stringify(canapeLocalStorage));
alert("Votre produit a été ajouté au panier");
}
})

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

// personnalisation du message erreur à afficher
function erreur() {
  const section = document.querySelector(".item");
  const article = document.querySelector("article");
  section.removeChild(article);
  const newPMessage = document.createElement("p");
  newPMessage.innerHTML = "Oups !<br>Il semble y avoir une erreur...";
  newPMessage.style.textAlign = "center";
  newPMessage.style.color = "black";
  section.appendChild(newPMessage);
}