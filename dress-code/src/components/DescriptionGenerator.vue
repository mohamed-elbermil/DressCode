<template>
  <v-main>
    <v-container class="d-flex align-center min-vh-100" style="max-width: 1200px;">
      <v-container class="form-container">
        <div class="text-center mb-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" 
            alt="logo Vinted" 
            class="mx-auto"
            style="width: 20em; max-width: 100%;"
          >
          <h1 class="text-center mb-8">Générateur de description</h1>
        </div>
        
        <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="marque"
                  :items="marques"
                  label="Marque"
                  variant="outlined"
                  clearable
                  :class="{ 'icon-filled': isMarqueFilled }"
                >
                  <template #prepend-inner>
                    <v-icon :color="isMarqueFilled ? 'success' : undefined">mdi-copyright</v-icon>
                  </template>
                </v-select>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="categorie"
                  :items="categories"
                  label="Catégorie"
                  variant="outlined"
                  clearable
                  :class="{ 'icon-filled': isCategorieFilled }"
                >
                  <template #prepend-inner>
                    <v-icon :color="isCategorieFilled ? 'success' : undefined">mdi-format-list-bulleted</v-icon>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="taille"
                  :items="size"
                  label="Taille"
                  variant="outlined"
                  clearable
                  :class="{ 'icon-filled': isTailleFilled }"
                >
                  <template #prepend-inner>
                    <v-icon :color="isTailleFilled ? 'success' : undefined">mdi-resize</v-icon>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="etat"
                  :items="state"
                  label="Etat"
                  variant="outlined"
                  clearable
                  :class="{ 'icon-filled': isEtatFilled }"
                >
                  <template #prepend-inner>
                    <v-icon :color="isEtatFilled ? 'success' : undefined">mdi-star</v-icon>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="couleur"
                  :items="couleurs"
                  label="Couleur"
                  variant="outlined"
                  clearable
                  :class="{ 'icon-filled': isCouleurFilled }"
                >
                  <template #prepend-inner>
                    <v-icon :color="isCouleurFilled ? 'success' : undefined">mdi-palette</v-icon>
                  </template>
                </v-select>
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

// Computed pour vérifier si les champs sont remplis
const isMarqueFilled = computed(() => !!marque.value)
const isCategorieFilled = computed(() => !!categorie.value)
const isTailleFilled = computed(() => !!taille.value)
const isEtatFilled = computed(() => !!etat.value)
const isCouleurFilled = computed(() => !!couleur.value)

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

.form-container {
  max-width: 100%;
  width: 100%;
}

/* Empêcher l'élargissement des champs */
:deep(.v-col) {
  flex: 0 0 auto;
  max-width: 100%;
}

:deep(.v-select),
:deep(.v-textarea) {
  width: 100%;
  max-width: 100%;
  min-width: 0; /* très important pour que le champ ne dépasse pas */
  box-sizing: border-box; /* inclut padding et border dans la largeur */
}


:deep(.v-field) {
  width: 100%;
  max-width: 100%;
}

/* S'assurer que les colonnes restent à leur largeur définie */
:deep(.v-row) {
  margin: 0;
}

:deep(.v-col) {
  padding: 8px 12px;
}

@media (min-width: 960px) {
  :deep(.v-col-md-6) {
    flex: 0 0 39em;
    max-width: 50%;
  }
}
</style>
