//récupération de l'adresse de la page
let adressePage = document.location.href;
let urlOrderId = new URL(adressePage);

//extraction du numéro d'identification de la commande
let orderId = urlOrderId.searchParams.get("orderId");

//Affichage d'un message d'erreur
if (orderId ===null||urlOrderId==="") {
    alert("Une erreur s'est produite veuillez nous en excuser. Commander ultérieurement.")
    window.location.href="index.html"
}
//Affichage du numéro d'identification de la commande
else {
    let idCommande = document.getElementById("orderId");
    idCommande.innerText = orderId;
    console.log(idCommande)
}