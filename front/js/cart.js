//modification du titre pour une accessibilité meilleure
document.title = "Le Panier";

//récupération des données mises dans le localStorage à partir de la page product
let canapes = JSON.parse(window.localStorage.getItem("produitCanapes"));

//Déclaration de la balise contenant les canapés
let parentArticle = document.getElementById("cart__items")

//Déclaration des variables pour commander
const boutonCommander = document.getElementById("order");

//Déclarations de variables
let mesProduits = []

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
      mesProduits= data;
      for (let i=0; i < canapes.length; i++) {
        let id = canapes[i].idProduit;
        let couleur= canapes[i].couleurProduit;
        let quantite = canapes[i].quantiteProduit;
        const donneesCanape = data.findIndex((element) => element._id === id);
        
        let prix = donneesCanape.price;

        //inserer la balise article du canape
        
        let article = document.createElement("article");
        article.setAttribute("cart__item");
        article.setAttribute("data-id",$`{id}`);
        article.setAttribute("data-color",$`{couleur}`);
        parentArticle.appendChild(article);

        //inserer l'image du canapé
        let divImage = document.createElement("div");
        article.appendChild(divImage);
        divImage.classList.add("cart__item__img");
        divImage.src = donneesCanape.imageUrl;
        divImage.altTxt = donneesCanape.altTxt;
    
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
        divDescription.appendChild(titre);
        let contenu_3 = document.createTextNode(donneesCanape.name);
        titre.appendChild(contenu_3);
    
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
        nombreProduit.setAttribute("name", "itemQuantity");
        nombreProduit.setAttribute("min", "1");
        nombreProduit.setAttribute("max","100");
        nombreProduit.setAttribute("value",quantite);
    
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


  