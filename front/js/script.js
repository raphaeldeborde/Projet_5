// fonction de requête des canapés //


// fonction d'intégration des données canapés dans l'index
  function afficherCanape (canape) {
    // crée un nouvel élément a
    var lienCanape = document.createElement("a");
    let baliseSection = document.getElementById("items");
    baliseSection.appendChild(lienCanape);
    lienCanape.href = `./product.html?${canape._id} €`;
  

    // et inscrit une balise article en son sein
    var donneesCanape = document.createElement("article");
    lienCanape.appendChild(donneesCanape);
  
    // et inscrit des balise à l'intérieur
    var imageCanape = document.createElement("img");
    donneesCanape.appendChild(imageCanape);
    const imageElement = document.createElement("img");
    imageCanape.src = canape.imageUrl;
    imageCanape.alt = canape.altTxt;

    var nomCanape = document.createElement("h3");
    donneesCanape.appendChild(nomCanape);
    var contenu_1 = document.createTextNode(canape.name);
    // ajoute le nœud texte au nouveau div créé
    nomCanape.appendChild(contenu_1);

    var descriptionCanape = document.createElement("p");
    donneesCanape.appendChild(descriptionCanape);
    var contenu_2 = document.createTextNode(canape.description);
  // ajoute le nœud texte au nouveau div créé
    descriptionCanape.appendChild(contenu_2);
    
    

  }

  function recuperationCanape() {
    fetch("http://localhost:3000/api/products")
    .then(function(reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function(valeurs) {
      for (let valeur of valeurs) {
        afficherCanape(valeur);
      }
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }

recuperationCanape()
