// fonction d'intégration des données canapés dans l'index
  function addElement () {
    // crée un nouvel élément a
    var newA = document.createElement("a");
    // et inscrit une balise article en son sein
    var newArticle = document.createElement('article');
  
    var newImage = document.createElement('img');
  
    var newH3 = document.createElement('h3');

    var newP = document.createElement('p');

    var newContent_1 = document.createTextNode('name');
    // ajoute le nœud texte au nouveau div créé
    newH3.appendChild(newContent_1);

    var newContent_2 = document.createTextNode('description');
  // ajoute le nœud texte au nouveau div créé
    newP.appendChild(newContent_2);
    

    // ajoute les nouvels éléments créés et leurs contenus dans le DOM
    var currentA = document.getElementsByTagName("a[href='imageUrl[i]'");
    document.section.insertBefore(newA, currentA);
    var currentArticle = document.getElementsByTagName();
    document.a.insertBefore(newArticle, currentArticle);
    var currentImg = document.setAttribut('src','.../' + image[i] + '.jpg');
    var currentImg = document.setAttribut('altTxt[i]',description[i]);
    document.article.insertBefore(newImg, currentImg);
    var currentH3 = document.getElementByClassName('productName');
    document.article.insertBefore(newH3, currentH3);
    var currentP = document.getElementByClassName('productDescription');
    document.article.insertBefore(newP, currentP);
  
  }
// fonction de requête des canapés //
fetch("http://localhost:3000/api/products")
  .then(function(réponse) {
    if (réponse.ok) {
      return réponse.json();
    }
  })
  .then(function(valeurs) {
      
    for (let i=0; i < canapes.lenght; i++) {
      {
        colors[i] = document.getElementsByName('colors');
        id[i] = document.getElementByName('_id');
        Name[i]=document.getElementByName('name');
        price[i]=document.getElementByName('price');
        imageUrl[i]=document.getElementByName('imageUrl');
        description[i]=document.getElementByName('description');
        altTxt[i]=document.getElementByName('altText');
  
        document.section.onload = addElement;
      }
    }
  
  })
  
  .catch(function(err) {
    // Une erreur est survenue
  });