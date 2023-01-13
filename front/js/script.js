

// fonction de requête des canapés //
fetch("http://localhost:3000/api/products")
  .then(function(réponse) {
    if (réponse.ok) {
      return réponse.json();
    }
  })
  .then(function(valeurs) {
    let canapés = [valeurs]
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  for (let canapé of canapés) {
    let elt=[canapé[i]]
    elt = document.getElementById('item');
    elt.innerHTML = <a href="./product.html?id=42">
                      <article>
                        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"/>
                        <h3 class="productName">Kanap name1</h3>
                        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                      </article>
                    </a>;
  }

  var str = "http://localhost:3000/api/products";
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search); 
  if(search_params.has('name')) {
    var name = search_params.get('name');
    console.log(name)
  }


