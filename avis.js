// Ce fichier exporte une fonction appelée "ajoutListenersAvis".
// Cette fonction est destinée à être appelée dans un contexte approprié, généralement dans le fichier où vous manipulez le DOM de votre page HTML.

export function ajoutListenersAvis() {
    // Sélectionne tous les éléments de bouton à l'intérieur de chaque article avec la classe "fiches".
    const piecesElements = document.querySelectorAll(".fiches article button");

    // Parcours tous les éléments de bouton trouvés.
    for (let i = 0; i < piecesElements.length; i++) {
        // Ajoute un écouteur d'événement "click" à chaque bouton.
        piecesElements[i].addEventListener("click", async function (event) {

        // Extrait l'ID de l'élément de bouton qui a déclenché l'événement pour récupérer sa valeur.
        const id = event.target.dataset.id;

        // Effectue une requête à l'URL de l'API pour obtenir les avis de la pièce qui possède l'id récupéré.
        fetch(`http://localhost:8081/pieces/${id}/avis`);//"fetch()" utilise le verbe HTTP "GET" par défaut

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