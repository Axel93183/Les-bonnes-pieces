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



/**
 * 
 * Les API en ligne sont utilisées pour persister vos données, c’est-à-dire les stocker durablement :
 * 
 * Les services web permettent de stocker durablement les données grâce à leur API en ligne.
 * 
 * Un navigateur web utilise le protocole HTTP pour envoyer des requêtes à destination du serveur, via sa barre de navigation.
 * 
 * Pour que le serveur identifie le type de requête envoyé, vous devez utiliser des verbes HTTP (POST, GET, PUT, DELETE).
 * 
 * En JavaScript, la fonction "fetch" est utilisée pour envoyer des requêtes au service web :
 * 
 * Les requêtes permettent de manipuler les données.
 * 
 * Elle utilise le verbe HTTP GET par défaut.
 * 
*/

/**
 * 
 * Le serveur peut traiter différents types de requêtes.
 * Les quatre types les plus courants sont : la création, la récupération, la modification et la suppression.
 * Pour que le serveur identifie quel type de requête il doit traiter, nous devons utiliser les verbes HTTP ci-dessous :
 * 
 * POST pour la création ;
 * GET pour la récupération ;
 * PUT pour la modification ;
 * DELETE pour la suppression.
 * 
**/

/**L’attribut data-id que nous avons utilisé sur la balise button n’est pas spécifique aux identifiants.
 * En réalité, nous pouvons créer n’importe quelle balise data-xxx et récupérer sa valeur en JavaScript avec dataset.xxx.
 **/