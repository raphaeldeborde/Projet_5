//modification du titre pour une accessibilité meilleure
document.title = "Le Panier";

//récupération des données mises dans le localStorage à partir de la page product
let canapes = JSON.parse(window.localStorage.getItem("produitCanapes"));

//Déclaration de la balise contenant les canapés
let parentArticle = document.getElementById("cart__items")

//Déclaration des variables pour commander
const boutonCommander = document.getElementById("order");


//Balise constamment en jeu
 
  if (canapes == null || canapes.length == 0) {
    messagePanierVide();

    boutonCommander.addEventListener("click", (event)=>{
      alert("Votre panier est vide !");
      event.preventDefault();
    });
  }
  else {
    fetch('http://localhost:3000/api/products/')
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(data => {
      for (let i=0; i < canapes.length; i++) {
        
          let id = canapes[i].idProduit;
          let couleur = canapes[i].couleurProduit;
          let quantite = canapes[i].quantiteProduit;
          let imageSrc = canapes[i].imageProduit;
          let imageAlt = canapes[i].altProduit;
                    
          const indice2 = data.findIndex((element) => element._id == id);
          let nom = data[indice2].name;
          let prix = data[indice2].price;
          
          // inserer la balise article du canape
        
          let article = document.createElement("article");
          article.classList.add("cart__item");
          article.setAttribute("data-id",`${id}`);
          article.setAttribute("data-color",`${couleur}`);
          parentArticle.appendChild(article);

          //inserer l'image du canapé
          let divImage = document.createElement("div");
          divImage.classList.add("cart__item__img");
          article.appendChild(divImage);
          let baliseImage = document.createElement("img");
          baliseImage.src = imageSrc;
          baliseImage.alt = imageAlt;
          divImage.appendChild(baliseImage);
    
          //Balise contenant la description et les paramètres
          let divContenu = document.createElement("div");
          article.appendChild(divContenu);
          divContenu.classList.add("cart__item__content");
          
          //insertion du contenant du nom, de la couleur et du prix 
          let divDescription = document.createElement("div");
          divContenu.appendChild(divDescription);
          divDescription.classList.add("cart__item__content__description");
    
          //insertion du nom
          let titre = document.createElement("h2");
          titre.innerText = nom;
          divDescription.appendChild(titre);
    
          //insertion de la couleur
          let couleurCanape = document.createElement("p");
          divDescription.appendChild(couleurCanape);
          let contenu_4 = document.createTextNode(couleur);
          couleurCanape.appendChild(contenu_4);
    
          //insertion du prix
          let prixPanier = document.createElement("p");
          prixPanier.innerText = prix + "€";
          divDescription.appendChild(prixPanier);
        
    
          //création du contenant des quantités et des suppressions
          let parametre = document.createElement("div");
          divContenu.appendChild(parametre);
          parametre.classList.add("cart__item__content__settings");
    
          //création du contenant de la quantité
          let emplacementQuantite = document.createElement("div");
          parametre.appendChild(emplacementQuantite);
          emplacementQuantite.classList.add("cart__item__content__settings__quantity");
    
          //insertion d'une indication Quantité
          let quantitePanier = document.createElement("div");
          emplacementQuantite.appendChild(quantitePanier);
          let contenu_6 = document.createTextNode("Qté : ");
          quantitePanier.appendChild(contenu_6);
    
          //insertion d'un input à remplir à propos de la quantité
          let nombreProduit = document.createElement("input");
          emplacementQuantite.appendChild(nombreProduit);
          nombreProduit.setAttribute("type","number");
          nombreProduit.setAttribute("class","itemQuantity");
          nombreProduit.setAttribute("name", "itemQuantity");
          nombreProduit.setAttribute("min", "1");
          nombreProduit.setAttribute("max","100");
          nombreProduit.setAttribute("value",`${quantite}`);
    
          //insertion de la balise de suppression
          let divDelete = document.createElement("div");
          parametre.appendChild(divDelete);
          divDelete.classList.add("cart__item__content__settings__delete");
    
          //insertion de l'indication de suppression
          let divItemDelete = document.createElement("p");
          divDelete.appendChild(divItemDelete);
          let contenu_7 = document.createTextNode("Supprimer");
          divItemDelete.appendChild(contenu_7);
          }
        }
      
    )
    .catch(function(erreur) {
  // Une erreur est survenue
    });
  }
  
  function messagePanierVide() {
    let panier = "Le panier est vide!";
    let titre = document.createElement("h2");
    parentArticle.appendChild(titre);
    titre.innerText = panier;
  }
function modifierPanier() {
  let nombreProduit = document.querySelectorAll(".itemQuantity");
  nombreProduit.forEach((nombreProduit)=>{
  
  nombreProduit.addEventListener("change", (event) => {
    event.preventDefault();
    let choixQuantite = Number(nombreProduit.value);

    let monArticle = nombreProduit.closest("article");
    let monArticleAuLocal = canapes.find(element => element.idProduct == monArticle.dataset.id && element.couleurProduit == monArticle.dataset.color);

    if (choixQuantite > 0 && choixQuantite <= 100 && Number.isInteger(choixQuantite)){
      let parseChoixQuantite = parseInt(choixQuantite);
      monArticleAuLocal.quantite = parseChoixQuantite;
      localStorage.setItem("produitCanapes",JSON.stringify(canapes));
      recalculerTotalQuantite();
      recalculerTotalPrix();
      messageErreurQuantite = false;
    }
    else {
      item.value = monArticleAuLocal.quantite;
      messageErreurQuantite = true;
    }
    if(messageErreurQuantite) {
      alert("La quantité d'un article (même référence et même couleur) doit être comprise entre 1 et 100 et être un nombre entier. Merci de rectifier la quantite choisie.");
    }
    }
  )
}
)
}
function supprimer() {
  let boutonSupprimer = document.querySelectorAll(".deleteItem");
  boutonSupprimer.forEach((boutonSupprimer)=>{
    boutonSupprimer.addEventListener("click", (event) => {
      event.preventDefault();

      let monArticle = boutonSupprimer.closest("article");
      canapes = canapes.filter(element => (element.idProduit !== monArticle.dataset.id || element.couleurProduit !== monArticle.dataset.color));
      
      localStorage.setItem("produitCanapes",JSON.stringify(canapes));

      alert("Ce produit va être supprimé du panier.");

      if (monArticle.parentNode) {
        monArticle.parentNode.removeChild(monArticle);
      }
      if(canapes == null || canapes.length == 0) {
        messagePanierVide();
      }
      else {
        recalculerTotalQuantite();
        recalculerTotalPrix();
      }
     } )
    }
  )}
  
  supprimer();
  modifierPanier();
calculTotalQuantite();
calculTotalPrix();
function calculTotalQuantite() {
  let totalQuantite = 0;
  for (let i=0; i<canapes.length;i++) {
    let quantiteCanape=canapes[i].quantiteProduit;
    totalQuantite = Number(totalQuantite) + Number(quantiteCanape);
  }
  document.getElementById("totalQuantity").innerText = totalQuantite;
}
function calculTotalPrix() {
  let totalPrix = 0;
  fetch('http://localhost:3000/api/products/')
    .then(function(reponse) {
      if (reponse.ok) {
        console.log(reponse)
        return reponse.json();
      }
    })
    .then(data =>{
      
      for (let i=0; i<canapes.length; i++) {
        let quantiteCanape = canapes[i].quantiteProduit;
        console.log(quantiteCanape)
        let id = canapes[i].idProduit;
        console.log(id)
        const indice2 = data.findIndex((element) => element._id == id);
        console.log(indice2)
        let LePrixCanape = data[indice2].price;
        console.log(LePrixCanape)
        let prixCanape = quantiteCanape*LePrixCanape;
        console.log(prixCanape)
        totalPrix += prixCanape;
        console.log(totalPrix)
  }
  document.getElementById("totalPrice").innerText = totalPrix;
})
.catch(function(erreur) {
  // Une erreur est survenue
});
  
}
function recalculerTotalQuantite() {
  let nombreTotalProduit = 0;
  nombreProduit.forEach((nombreProduit)=>{
  
  nombreTotalProduit = nombreProduit + nombreTotalProduit;
  document.getElementById("totalQuantity").innerText=nombreTotalProduit;
    }
  )
}

function recalculerTotalPrix() {

}