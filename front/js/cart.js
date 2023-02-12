//modification du titre pour une accessibilité meilleure
document.title = "Le Panier";

//récupération des données mises dans le localStorage à partir de la page product
let canapes = JSON.parse(window.localStorage.getItem("produitCanapes"));

//Déclaration de la balise contenant les canapés
let parentArticle = document.getElementById("cart__items")

//Déclaration des variables pour commander
const boutonCommander = document.getElementById("order");

let boutonsSupprimer = [];
//Balise constamment en jeu

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

          modifierCanape(nombreProduit);

          //insertion de la balise de suppression
          let divDelete = document.createElement("div");
          parametre.appendChild(divDelete);
          divDelete.classList.add("cart__item__content__settings__delete");
    
          //insertion de l'indication de suppression
          let boutonSupprimer = document.createElement("p");
          divDelete.appendChild(boutonSupprimer);
          let contenu_7 = document.createTextNode("Supprimer");
          boutonSupprimer.appendChild(contenu_7);

          supprimerCanape(boutonSupprimer);

          verificationPrenom();
          verificationNom();
          verificationAdresse();
          verificationVille();
          verificationEmail();

          commanderCanape(i);
          }
        }
      
    )
    .catch(function(erreur) {
  // Une erreur est survenue
    });
    

  function messagePanierVide() {
    let panier = "Le panier est vide!";
    let titre = document.createElement("h2");
    parentArticle.appendChild(titre);
    titre.innerText = panier;
  }
  
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
        return reponse.json();
      }
    })
    .then(data =>{
      
      for (let i=0; i<canapes.length; i++) {
        let quantiteCanape = canapes[i].quantiteProduit;
        let id = canapes[i].idProduit;
        const indice2 = data.findIndex((element) => element._id == id);
        let LePrixCanape = data[indice2].price;
        let prixCanape = quantiteCanape*LePrixCanape;
        totalPrix += prixCanape;
  }
  document.getElementById("totalPrice").innerText = totalPrix;
})
.catch(function(erreur) {
  // Une erreur est survenue
});  
}
function supprimerCanape(boutonSupprimer) {
    boutonSupprimer.addEventListener("click",() => {
      let articleSupprimer = boutonSupprimer.closest("article");
      let idSupprimer = articleSupprimer.dataset.id;
      let couleurSupprimer = articleSupprimer.dataset.color;
      const indice3 = canapes.findIndex((element) => element.idProduit === idSupprimer && element.couleurProduit === couleurSupprimer);
      canapes.splice(indice3, 1);
      window.localStorage.setItem("produitCanapes", JSON.stringify(canapes));
      
      alert("ce produit est supprimé");

      if (articleSupprimer.parentNode) {
        articleSupprimer.parentNode.removeChild(articleSupprimer);
      }
      if(canapes == null || canapes.length == 0) {
        window.localStorage.clear("produitCanapes");
        messagePanierVide();
        calculTotalQuantite();
        calculTotalPrix();
      }
      else {
        calculTotalQuantite();
        calculTotalPrix();
      }
    })
  }
  function modifierCanape(nombreProduit) {
    nombreProduit.addEventListener("change",()=> {
      let articleModifier = nombreProduit.closest("article");
      console.log(articleModifier)
      let idModifier = articleModifier.dataset.id;
      console.log(idModifier)
      let couleurModifier = articleModifier.dataset.color;
      console.log(couleurModifier)
      const indice4 = canapes.findIndex(element =>((element.idProduit === idModifier) && (element.couleurProduit === couleurModifier)));
      console.log(indice4)
      let nouvelleQuantite= nombreProduit.value;
      console.log(nouvelleQuantite)
      let imageUrl = canapes[indice4].imageProduit;
      let nom = canapes[indice4].nomProduit;
      let alt = canapes[indice4].altProduit;
      let description = canapes[indice4].descriptionProduit;
      memeProduit = {
        idProduit:idModifier,
        couleurProduit:couleurModifier,
        quantiteProduit:nouvelleQuantite,
        imageProduit:imageUrl,
        nomProduit:nom,
        descriptionProduit:description,
        altProduit:alt,
      }
      console.log(memeProduit)
      canapes.splice([indice4], 1, memeProduit);
      console.log(canapes)
      window.localStorage.setItem("produitCanapes", JSON.stringify(canapes));
      alert("La quantité de ce type de Canapé a changé");
      calculTotalQuantite();
      calculTotalPrix();
    }
    )
  }
function verificationPrenom() {
  let prenomRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
  let prenomInput = document.getElementById("firstName");
  let prenomErreur = document.getElementById("firstNameErrorMsg");
  prenomInput.addEventListener("change", (e)=> {
    prenom= e.target.value
    if (prenomRegex.test(prenom) == true) {
      prenomErreur.innerText = "";
      boutonCommander.style.display ="block";
    }  
    else {
      prenomErreur.innerText = "Utilisez seulement des Lettres !";
      boutonCommander.style.display ="none";
    }
})
}
function verificationNom() {
  let nomRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
  let nomInput = document.getElementById("lastName");
  let nomErreur = document.getElementById("lastNameErrorMsg");

  nomInput.addEventListener("change",(e)=> {
    nom = e.target.value;
    if (nomRegex.test(nom) == true) {
      nomErreur.innerText = "";
      boutonCommander.style.display ="block";
    }
    else {
      nomErreur.innerText = "Utilisez seulement des Lettres!";
      boutonCommander.style.display ="none";
    }
  })
}
function verificationAdresse() {
  let adresseRegex = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
  let adresseInput = document.getElementById("address");
  let adresseErreur = document.getElementById("addressErrorMsg");

  adresseInput.addEventListener("change", (e)=> {
    adresse = e.target.value;
    if (adresseRegex.test(adresse) == true) {
      adresseErreur.innerText = "";
      boutonCommander.style.display ="block";
    }
    else {
      adresseErreur.innerText = "Utilisez seulement des Chiffres et des Lettres"
      boutonCommander.style.display ="none";
    }
  })
}
function verificationVille() {
  let villeRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
  let villeInput = document.getElementById("city");
  let villeErreur = document.getElementById("cityErrorMsg");

  villeInput.addEventListener("change", (e)=> {
    ville = e.target.value;
    if (villeRegex.test(ville) == true) {
      villeErreur.innerText = "";
      boutonCommander.style.display ="block";
    }
    else {
      villeErreur.innerText = "Utilisez seulement des Lettres"
      boutonCommander.style.display ="none";
    }
  })
}
function verificationEmail() {
  let emailRegex = /^[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  let emailInput = document.getElementById("email");
  let emailErreur = document.getElementById("emailErrorMsg");

  emailInput.addEventListener("change", (e)=> {
    email = e.target.value;
    if (emailRegex.test(email) == true) {
      emailErreur.innerText = "";
      boutonCommander.style.display ="block";
    }
    else {
      emailErreur.innerText = "Entrez une Adresse Email valide!"
      boutonCommander.style.display ="none";      
    }
  })
}
function commanderCanape(i) {
  boutonCommander.addEventListener('click', function(event) {
  if ((canapes == null)||(canapes.length == 0)) {
    alert("Le panier est vide!")
    event.preventDefault();
  }
  else {
    preparationPost();
  }
}
  )
}
function preparationPost() {
    let prenomInput = document.getElementById("firstName");
    let nomInput = document.getElementById("lastName");
    let adresseInput = document.getElementById("address");
    let villeInput = document.getElementById("city");
    let emailInput = document.getElementById("email");

    let idsCommande = [];
    for (i=0; i < canapes.length; i++) {
    let idCommande = canapes[i].idProduit;
    idsCommande.push(idCommande);
    }
    console.log(idsCommande)

    let infoCommande={
      contact: {
        prenom:prenomInput.value,
        nom:nomInput.value,
        adresse:adresseInput.value,
        ville:villeInput.value,
        email:emailInput.value,
      },
        produits: {
          ids:idsCommande,
        }
    }
    console.log(infoCommande)
    
    alert("c'est partie")
    requetePost();
}

function requetePost() {
  let order = {
    contact,
    produits
  };
  console.log(order)
  alert("order");
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Accept": "application.json",
      "Content-Type": "application/json;charset=utf-8"
    },
    body:JSON.stringify(order)
  })
  .then((reponse) => {
    if (reponse.status == 200) {
      return reponse.json();
    }
    else {
      alert("La validation de l'achat a échoué. Veuillez réessayer.");
      console.error("Echec de la requête POST, status:" + reponse.status);
    }
  })
  .then((data) =>
  {
    finalisation(data.orderId);
  })
}
function finalisation(orderId) {
  localStorage.clear("produitsCanape");
  document.location.href = `confirmation.html?id=${orderId}`;
}