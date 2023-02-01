let canapes = window.localStorage.getItem("produitCanapes");
for (let canape in canapes) {
    insererCanape(canape);
}

function insererCanape(canape) {
    var parentArticle = document.getElementById("cart__items")
    var article = document.createElement("article");
    parentArticle.appendChild(article);
    article.classList.add("cart__item");
    article.setAttribute("data-id","{product-Id}")
    article.setAttribute("data-color","{product-color}")

    var divImage = document.createElement("div");
    article.appendChild(divImage);
    divImage.classList.add("cart__item__img");
    divImage.src = imageProduit.canape;
    divImage.altTxt = descriptionProduit.canape;

    var divContenu = document.createElement("div");
    article.appendChild(divContenu);
    divContenu.classList.add("cart__item__content");

    var divDescription = document.createElement("div");
    divContenu.appendChild(divDescription);
    divDescription.classList.add("cart__item__content__description");

    var titre = document.createElement("h2");
    divDescription.appendChild(titre);
    var contenu_3 = document.createTextNode(canape.nomProduit);
    titre.appendChild(contenu_3);

    var couleur = document.createElement("p");
    divDescription.appendChild(couleur);
    var contenu_4 = document.createTextNode(canape.couleurProduit);
    couleur.appendChild(contenu_4);

    var prixPanier = document.createElement("p");
    divDescription.appendChild(prixPanier);
    var contenu_5 = document.createTextNode(canape.prix)
    prixPanier.appendChild(contenu_5);

    var parametre = document.createElement("div");
    divContenu.appendChild(parametre);
    parametre.classList.add("cart__item__content__settings");

    var emplacementQuantite = document.createElement("div");
    parametre.appendChild(emplacementQuantite);
    emplacementQuantite.classList.add("cart__item__content__settings__quantity");

    var quantitePanier = document.createElement("div");
    emplacementQuantite.appendChild(quantitePanier);
    var contenu_6 = "Qté : ";
    quantitePanier.appendChild(contenu_6);

    var nombreProduit = document.createElement("input");
    emplacementQuantite.appendChild(nombreProduit);
    nombreProduit.setAttribute("name", "itemQuantity");
    nombreProduit.setAttribute("min", "1");
    nombreProduit.setAttribute("max","100");
    nombreProduit.setAttribute("value","42");

    var divDelete = document.createElement("div");
    parametre.appendChild(divDelete);
    divDelete.classList.add(cart__item__content__settings__delete);

    var divItemDelete = document.createElement("p");
    divDelete.appendChild(divItemDelete);
    var contenu_7 = "Supprimer";
    divItemDelete.appendChild(contenu_7);
}