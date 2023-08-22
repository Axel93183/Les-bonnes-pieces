// Ce fichier exporte une fonction appelée "ajoutListenersAvis".
// Cette fonction est destinée à être appelée dans un contexte approprié, généralement dans le fichier où vous manipulez le DOM de votre page HTML.

export function ajoutListenersAvis() {
    // Sélectionne tous les éléments de bouton à l'intérieur de chaque article avec la classe "fiches".
    const boutonsAvisPiecesElements = document.querySelectorAll(".fiches article button");

    // Parcours tous les éléments de bouton trouvés.
    for (let i = 0; i < boutonsAvisPiecesElements.length; i++) {
        // Ajoute un écouteur d'événement "click" à chaque bouton.
        boutonsAvisPiecesElements[i].addEventListener("click", async function (event) {

            // Extrait l'ID de l'élément de bouton qui a déclenché l'événement pour récupérer sa valeur.
            const id = event.target.dataset.id;

            //Effectue une requête à l'adresse URL de l'API construite en utilisant l'id de la pièce dans le chemin.
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);// La fonction "fetch()" est utilisée pour effectuer une requête HTTP vers cette URL.

            // La réponse de la requête est traitée en tant que données JSON.
            // Cette ligne utilise "await" pour attendre que la réponse soit résolue en tant que données JSON.
            const avis = await reponse.json();

            const articleElement = event.target.parentElement;
            // "event" fait référence à l'événement déclencheur de la fonction.
            // "event.target" pointe vers l'élément HTML qui a déclenché l'événement, le <button>
            // "parentElement" récupère l'élément parent de l'élément déclencheur, qui est la balise <article>
            // Cette ligne vise à stocker l'élément parent de l'élément déclencheur dans "articleElement".

            const avisElement = document.createElement("p");
            // Crée un nouvel élément HTML de type paragraphe (<p>).
            // Cet élément sera utilisé pour afficher les avis récupérés de l'API.

            // Parcourt chaque élément dans le tableau "avis" obtenu à partir des données JSON.
            for (let i = 0; i < avis.length; i++) {
                // Pour chaque élément d'avis, le nom d'utilisateur et le commentaire sont extraits et ajoutés au contenu HTML de "avisElement".
                avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;// "<br>" est utilisé pour créer une nouvelle ligne après chaque avis.
            }

            // Ajoute l'élément "avisElement" (contenant les avis au format HTML) comme enfant de "articleElement".
            articleElement.appendChild(avisElement);
            // Cela insère les avis dans l'élément parent de l'élément déclencheur, probablement pour afficher les avis à côté de la pièce correspondante.

        });
    }
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(event.target.querySelector("[name=nb-etoiles]").value),
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    });
}
/**
 * 
 * Personnalisez votre requête avec le deuxième argument de fetch:
 * 
 *  fetch("chemin de la ressource", {  Objet de configuration  });

 * Configurez l’objet du deuxième argument en renseignant trois propriétés :
 * 
 * method pour le verbe HTTP ;
 * body pour la charge utile ;
 * headers pour les en-têtes.
 * 
 * Pour créer une nouvelle ressource avec une API HTTP qui accepte le format JSON, vous devez utiliser :
 * 
 * le verbe POST ;
 * un body au format JSON ;
 * un en-tête Content-Type application/json.
 * 
 */