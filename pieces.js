import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

// Récupération des pièces depuis l'API
const reponse = await fetch(`http://localhost:8081/pieces/`);
const pieces = await reponse.json();
ajoutListenerEnvoyerAvis();
// Récupération des pièces depuis le fichier JSON
//const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

/******************************************************************************************************************/
/************************************AUTRE SYNTAXE DE RÉCUPÉRATION*************************************************/
/******************************************************************************************************************/
//const reponse = await fetch("pieces-autos.json"); // Envoie une requête pour récupérer le contenu du fichier JSON
//const pieces = await reponse.json(); // Parse la réponse en tant qu'objet JavaScript (ici, un tableau "[]") contenant les pièces
/*("Parse" signifie analyser et transformer des données d'un format à un autre, généralement pour rendre les données utilisables par un programme informatique.)*/
/******************************************************************************************************************/
/******************************************************************************************************************/

// Fonction qui génère toute la page web
function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = article.image;
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);

        // Idem pour le nom, le prix et la catégorie...
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        pieceElement.appendChild(nomElement);

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        pieceElement.appendChild(prixElement);

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        pieceElement.appendChild(categorieElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment"
        pieceElement.appendChild(descriptionElement);

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"
        pieceElement.appendChild(disponibiliteElement);

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;// Affecte un attribut personnalisé "data-id" à l'élément bouton.
        avisBouton.textContent = "Afficher les avis";
        pieceElement.appendChild(avisBouton);

        // On rattache la balise article au body
        document.querySelector(".fiches").appendChild(pieceElement);
    }
    // Ajout de la fonction ajoutListenersAvis
    ajoutListenersAvis();
}
// Appel de la fonction pour le premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);//créer une copie de la liste "pieces".
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    //console.log(piecesOrdonnees);
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
// Ajoute un écouteur d'événements pour le clic sur le bouton "boutonFiltrer"
boutonFiltrer.addEventListener("click", function () {
    // Crée un nouveau tableau "piecesFiltrees" en filtrant les éléments du tableau "pieces"
    // Le filtre est basé sur la condition que le prix de chaque "piece" soit inférieur ou égal à 35
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.disponibilite;
    });
    // Affiche le tableau résultant après le filtrage dans la console
    //console.log(piecesFiltrees);
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonFiltreDescription = document.querySelector(".btn-filtrer-description");
boutonFiltreDescription.addEventListener("click", function () {
    const piecesAvecDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesAvecDescription);
});

const boutonTriDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTriDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);//créer une copie de la liste "pieces".
    piecesOrdonnees.sort((a, b) => {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
})

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}
//console.log(noms)

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables à moins de 35 € :";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
document.querySelector(".abordables")
    .appendChild(pElement)
    .appendChild(abordablesElements)

const pElementDispo = document.createElement('p')
pElementDispo.innerText = "Pièces disponibles :"
const nomsDispo = pieces.map(piece => piece.nom);
const prixDispo = pieces.map(piece => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
    if (!pieces[i].disponibilite) {
        nomsDispo.splice(i, 1);
        prixDispo.splice(i, 1);
    }
}

const disponiblesElement = document.createElement("ul");

for (let i = 0; i < nomsDispo.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDispo[i]} - ${prixDispo[i]} €`;
    disponiblesElement.appendChild(nomElement)
}

document.querySelector('.disponibles')
    .appendChild(pElementDispo)
    .appendChild(disponiblesElement)

// Création d'un élément <input> de type "range"
const inputRange = document.createElement("input");
inputRange.type = "range"; // Définition du type d'input en "range"
inputRange.id = "prixMax"; // Définition de l'ID de l'élément input
inputRange.name = "prixMax"; // Définition du nom de l'élément input
inputRange.min = "0"; // Définition de la valeur minimale
inputRange.max = "60"; // Définition de la valeur maximale
inputRange.step = "5"; // Définition de l'incrément (pas)
inputRange.value = "60"; // Définition de la valeur initiale

// Ajout de l'élément <input> à la div avec la classe "filtres"
document.querySelector(".filtres").appendChild(inputRange);

// Création d'un élément <p> pour afficher la valeur du prix maximum
const prixMaxValue = document.createElement("p");
prixMaxValue.id = "prixMaxValue"; // Définition de l'ID de l'élément <p>
prixMaxValue.textContent = "Prix maximum : 60 €"; // Texte initial

// Ajout de l'élément <p> à la div avec la classe "filtres"
document.querySelector(".filtres").appendChild(prixMaxValue);

// Ajout d'un événement d'écoute pour détecter les changements de valeur dans l'input range
inputRange.addEventListener("input", () => {
    prixMaxValue.textContent = `Prix maximum : ${inputRange.value} €`; // Mise à jour du texte avec la valeur sélectionnée

    // Filtrer les pièces en fonction de la valeur de l'input range
    const piecesFiltrees = pieces.filter(piece => piece.prix <= inputRange.value) 
    //console.log(piecesFiltrees);

    // const piecesFiltrees = pieces.filter(function(piece){
    //     return piece.prix <= inputRange.value;
    // });

    // Générer les fiches des pièces filtrées
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

