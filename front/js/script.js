// fonction d'intégration des données d'un canapé dans l'index html
  
function afficherCanape(canape) {
  
  // création balise a
    var lienCanape = document.createElement("a");

  // récupération de la balise parent
    let baliseSection = document.getElementById("items");
  
  // integration de la balise a, création de la relation parent/enfant
    baliseSection.appendChild(lienCanape);

  // ajout de l'ancre
    lienCanape.href = `./product.html?id=${canape._id}`;
    
  // ajout de la balise article contenant les données du canapé
    var donneesCanape = document.createElement("article");
    lienCanape.appendChild(donneesCanape);
  
  // ajout de l'image du canapé
    var imageCanape = document.createElement("img");
    donneesCanape.appendChild(imageCanape);
    imageCanape.src = canape.imageUrl;
    imageCanape.alt = canape.altTxt;

  // ajout du nom du canapé
    var nomCanape = document.createElement("h3");
    donneesCanape.appendChild(nomCanape);
    var contenu_1 = document.createTextNode(canape.name);
    nomCanape.appendChild(contenu_1);

  // ajout de la description du canapé
    var descriptionCanape = document.createElement("p");
    donneesCanape.appendChild(descriptionCanape);
    var contenu_2 = document.createTextNode(canape.description);
    descriptionCanape.appendChild(contenu_2);
    
  }
  
// fonction de requête des canapés et implémentation un à un
  function recuperationCanape() {
    fetch("http://localhost:3000/api/products")
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(valeurs) {
//passage de chaque canape, pour les inserer tout à tour
      for (let valeur of valeurs) {
        afficherCanape(valeur);
      }
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }

recuperationCanape()
