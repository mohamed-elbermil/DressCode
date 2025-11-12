<template>
  <v-main>
    <v-container class="d-flex align-center min-vh-100">
        <v-container>
          <div class="text-center mb-8">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" 
              alt="logo Vinted" 
              class="mx-auto"
              style="width: 20em; max-width: 100%;"
            >
            <h1 class="text-center mb-8">Générateur de description</h1>
          </div>
          
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="marque"
                  :items="marques"
                  label="Marque"
                  prepend-inner-icon="mdi-copyright"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="categorie"
                  :items="categories"
                  label="Catégorie"
                  prepend-inner-icon="mdi-format-list-bulleted"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="taille"
                  :items="size"
                  label="Taille"
                  prepend-inner-icon="mdi-resize"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="etat"
                  :items="state"
                  label="Etat"
                  prepend-inner-icon="mdi-star"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="couleur"
                  :items="couleurs"
                  label="Couleur"
                  prepend-inner-icon="mdi-palette"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-label class="text-h6 font-weight-bold mb-2">Votre description</v-label>
                <v-textarea
                  :model-value="descriptionText"
                  readonly
                  variant="outlined"
                  rows="10"
                  class="mt-2"
                ></v-textarea>
                <v-btn
                  :color="copyButtonColor"
                  :prepend-icon="copyButtonIcon"
                  @click="copyDescription"
                  class="mt-3"
                  size="large"
                >
                  {{ copyButtonText }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { brands as marques } from '@/data/brands'
import { categories } from '@/data/categories'
import { size } from '@/data/size'
import { state } from '@/data/state'
import { couleurs } from '@/data/color.js'

// Données réactives
const marque = ref(null)
const categorie = ref(null)
const taille = ref(null)
const etat = ref(null)
const couleur = ref(null)
const copyButtonText = ref('Copier la description')
const copyButtonColor = ref('secondary')
const copyButtonIcon = ref('mdi-content-copy')


// Données utilisateur
const nom = 'Mickael'
const taille_user = '1m69'
const poid = 65

// Description calculée (texte brut pour v-textarea)
const descriptionText = computed(() => {
  if (categorie.value && taille.value && etat.value && couleur.value) {
    return `✨Magnifique ${categorie.value} de la marque ${marque.value || 'la marque'}

• Etat : ${etat.value}
• Couleur : ${couleur.value}
• Taille : ${taille.value}

Salut, c'est ${nom}, je mesure ${taille_user} pour ${poid}kg, pour te donner une idée de la coupe😉.

📦 Envoi rapide et soigné (sous 48h max après achat)
💬 Dispo pour questions ou négociation – n'hésite pas ! 😊

Pour toutes questions ou informations supplémentaires, je suis ouvert à la discussion et aux négociations !😊`
  } else {
    return 'Veuillez sélectionner les options ci-dessus pour générer une description.'
  }
})

// Fonction pour copier la description
const copyDescription = async () => {
  try {
    await navigator.clipboard.writeText(descriptionText.value)
    
    // Feedback visuel
    copyButtonText.value = 'Copié ! ✅'
    copyButtonColor.value = 'success'
    copyButtonIcon.value = 'mdi-check'

    setTimeout(() => {
      copyButtonText.value = 'Copier la description'
      copyButtonColor.value = 'secondary'
      copyButtonIcon.value = 'mdi-content-copy'
    }, 2000)
  } catch (err) {
    // Fallback pour les navigateurs plus anciens
    const tempElement = document.createElement('textarea')
    tempElement.value = descriptionText.value
    document.body.appendChild(tempElement)
    tempElement.select()
    document.execCommand('copy')
    document.body.removeChild(tempElement)

    copyButtonText.value = 'Copié ! ✅'
    copyButtonColor.value = 'success'
    copyButtonIcon.value = 'mdi-check'

    setTimeout(() => {
      copyButtonText.value = 'Copier la description'
      copyButtonColor.value = 'secondary'
      copyButtonIcon.value = 'mdi-content-copy'
    }, 2000)
  }
}
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>
