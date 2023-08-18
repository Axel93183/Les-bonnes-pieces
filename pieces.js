// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json"); // Envoie une requête pour récupérer le contenu du fichier JSON

const pieces = await reponse.json(); // Parse la réponse en tant qu'objet JavaScript (ici, un tableau "[]") contenant les pièces

/*("Parse" signifie analyser et transformer des données d'un format à un autre, généralement pour rendre les données utilisables par un programme informatique.)*/

for (let i = 0; i < pieces.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = pieces[i].image;

    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment"

    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock"

    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
}

const boutonTrier = document.querySelector(".btn-trier");

const piecesOrdonnees = Array.from(pieces);//créer une copie de la liste "pieces". Cela permet de ne pas toucher à l'ordre de la liste "pieces" pour que les autre tris et filtres de la page fonctionnent correctement
boutonTrier.addEventListener("click", function () {
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
// Ajoute un écouteur d'événements pour le clic sur le bouton "boutonFiltrer"
boutonFiltrer.addEventListener("click", function () {
    // Crée un nouveau tableau "piecesFiltrees" en filtrant les éléments du tableau "pieces"
    // Le filtre est basé sur la condition que le prix de chaque "piece" soit inférieur ou égal à 35
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    // Affiche le tableau résultant après le filtrage dans la console
    console.log(piecesFiltrees);
});

const boutonFiltreDescription = document.querySelector(".btn-filtrer-description");
boutonFiltreDescription.addEventListener("click", function () {
    const piecesAvecDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesAvecDescription);
})

const boutonTriDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTriDecroissant.addEventListener("click", () => {
    piecesOrdonnees.sort((a, b) => {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);

})

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}
//console.log(noms)

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(abordablesElements)

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

document.querySelector('.disponibles').appendChild(disponiblesElement)