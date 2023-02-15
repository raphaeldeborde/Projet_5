let adressePage = document.location.href;
let urlOrderId = new URL(adressePage);

let orderId = urlOrderId.searchParams.get("orderId");

console.log(orderId)
if (orderId ===null||urlOrderId==="") {
    alert("Une erreur s'est produite veuillez nous en excuser. Commander ultérieurement.")
    window.location.href="index.html"
}
else {
    let idCommande = document.getElementById("orderId");
    idCommande.innerText = orderId;
    console.log(idCommande)
}