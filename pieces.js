// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json"); // Envoie une requête pour récupérer le contenu du fichier JSON

const pieces = await reponse.json(); // Parse la réponse en tant qu'objet JavaScript (ici, un tableau "[]") contenant les pièces

/*("Parse" signifie analyser et transformer des données d'un format à un autre, généralement pour rendre les données utilisables par un programme informatique.)*/

// Sélection du premier article
const article = pieces[0]; // Sélectionne le premier élément du tableau de pièces

// Création de l'élément d'image
const imageElement = document.createElement("img");

// Accède à la propriété 'image' de l'objet 'article' (la 1ère piece) et affecte sa valeur à la propriété 'src' de l'élément <img>
imageElement.src = article.image;

const nomElement = document.createElement("h2"); // Crée un élément <h2> dans le DOM

nomElement.innerText = article.nom; // Affecte la valeur de la propriete 'nom' de l'article comme contenu textuel de l'élément <h2> avec la méthode innerText

const prixElement = document.createElement("p"); // Crée un élément <p> dans le DOM

prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35  ? "€" : "€€€"})`; // Utilise une template string (littéraux de gabarit : ils commencent et se terminent toujours par des backticks ``) pour afficher la valeur de la propriete 'prix' de l'article dans le <p>.
//On affiche aussi un symbole '€' ou '€€€' selon 'article.prix < 35'.

const categorieElement = document.createElement("p"); // Crée un élément <p> dans le DOM

categorieElement.innerText = article.categorie ?? "(aucune catégorie)"; // Affecte la valeur de la propriete 'catégorie' de l'article comme contenu textuel de l'élément <p>, sinon affecte '(aucune catégorie)' comme contenu textuel

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment"

const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"

// Sélectionne l'élément HTML avec la classe "fiches"
const sectionFiches = document.querySelector(".fiches");

// Appelle la méthode appendChild() sur l'élément avec la classe "fiches" (sectionFiches) pour ajouter l'élément <img> (imageElement) en tant qu'enfant
sectionFiches.appendChild(imageElement);

sectionFiches.appendChild(nomElement);

sectionFiches.appendChild(prixElement);

sectionFiches.appendChild(categorieElement);

sectionFiches.appendChild(descriptionElement);

sectionFiches.appendChild(disponibiliteElement);