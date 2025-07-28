// Récupération des éléments

const marqueSelect = document.getElementById('marque');
const categorieSelect = document.getElementById('categorie');
const tailleSelect = document.getElementById('taille');
const etatSelect = document.getElementById('etat');
const colorSelect = document.getElementById('couleur');
const descriptionElement = document.getElementById('description');

function updateDescription() {
    // Vêtement
    const marque = marqueSelect.value;
    const categorie = categorieSelect.value;
    const taille = tailleSelect.value;
    const etat = etatSelect.value;
    const color = colorSelect.value;

    // Utilisateur
    const nom = "Mickael";
    const taille_user = "1m69";
    const poid = 65;
    
    if (categorie && taille && etat && color) {
        descriptionElement.innerHTML = `
        <p>✨Magnifique ${categorie} de la marque ${marque}</p><br>
        <ul>
            <li><strong>Etat : </strong> ${etat}</li>
            <li><strong>Couleur : </strong> ${color}</li>
            <li><strong>Taille :</strong> ${taille}</li>
        </ul><br>

Salut, c'est ${nom}, je mesure ${taille_user} pour ${poid}kg, pour te donner une idée de la coupe😉.<br><br>

📦 Envoi rapide et soigné (sous 48h max après achat)<br> 💬 Dispo pour questions ou négociation – n’hésite pas ! 😊<br><br>

Pour toutes questions ou informations supplémentaires, je suis ouvert à la discussion et aux négociations !😊`
    } else {
        descriptionElement.textContent = "Veuillez sélectionner les options ci-dessus pour générer une description."
    }
}

// Ecouteur de changement 

categorieSelect.addEventListener('change', updateDescription);
tailleSelect.addEventListener('change', updateDescription);
etatSelect.addEventListener('change', updateDescription);
colorSelect.addEventListener('change', updateDescription);