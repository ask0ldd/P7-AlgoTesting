import searchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesAdapter from "./adapters/recipesAdapter.js"
import filteringChain from "./utils/filteringChain.js"
import recipesGallery from "./components/recipesGallery.js"
import InputSelect from "./blueprints/inputSelect.js"
import { Comparators } from "./utils/comparators.js"

/*function removeDuplicates(array){
    return array.filter((element, index, array) => array.indexOf(element) === index)
}

function intersectTwoRecipesArrays(recipesArray1, recipesArray2){
    // iterate on the smaller array for optimisation purposes
    return recipesArray1.length < recipesArray2.length ? 
    recipesArray1.filter(recipe => recipesArray2.includes(recipe)) : 
    recipesArray2.filter(recipe => recipesArray1.includes(recipe))
}*/

const adaptedRecipes = new RecipesAdapter(recipes)
Object.freeze(adaptedRecipes) // implement deepfreeze
const appliancesInputSelect = new InputSelect('#input-appareils', '#select-appareils', '#options-appareils', 'Rechercher un appareil', 'Appareils') // should passe array to be more explicit
const ustensilsInputSelect = new InputSelect('#input-ustensiles', '#select-ustensiles', '#options-ustensiles', 'Rechercher un ustensile', 'Ustensiles')
const ingredientsInputSelect = new InputSelect('#input-ingredients', '#select-ingredients', '#options-ingredients', 'Rechercher un ingredient', 'Ingredients')

//----------------------------------------------
// events triggered when typing into the searchbar
//----------------------------------------------
searchBar.addEventListener('input', (e) => {
    emptyInputSelects()
    let filteredRecipes
    filteredRecipes = filteringChain.fullResolution()
    recipesGallery.refresh(filteredRecipes)
})

//----------------------------------------------
// events triggered when typing into the inputs
// N.B. : Basic Filtering Chain = search input + tags filtering
//----------------------------------------------
appliancesInputSelect.addEventListener('input', () => { // get rid of node
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesInputSelect.value, 'appliances')
    appliancesInputSelect.updateOptions(appliancesOptions, 'appliances')
})

appliancesInputSelect.addEventListener('focus', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesInputSelect.value, 'appliances')
    appliancesInputSelect.updateOptions(appliancesOptions, 'appliances')
    appliancesInputSelect.focus()
})

appliancesInputSelect.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

ustensilsInputSelect.addEventListener('input', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsInputSelect.value, 'ustensils')
    ustensilsInputSelect.updateOptions(ustensilesOptions, 'ustensils')
})

ustensilsInputSelect.addEventListener('focus', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsInputSelect.value, 'ustensils')
    ustensilsInputSelect.updateOptions(ustensilesOptions, 'ustensils')
    ustensilsInputSelect.focus()
})

ustensilsInputSelect.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

ingredientsInputSelect.addEventListener('input', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsInputSelect.value, 'ingredients')
    ingredientsInputSelect.updateOptions(ingredientsOptions, 'ingredients')
})

ingredientsInputSelect.addEventListener('focus', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsInputSelect.value, 'ingredients')
    ingredientsInputSelect.updateOptions(ingredientsOptions, 'ingredients')
    ingredientsInputSelect.focus()
})

ingredientsInputSelect.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

//----------------------------------------------
// Fn
//----------------------------------------------
function updateAllOptions(recipes){ // throw error si recipes missing
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsInputSelect.value, 'ustensils') // !!! should pass recipes as a parameter
    ustensilsInputSelect.updateOptions(ustensilesOptions, 'ustensils')
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesInputSelect.value, 'appliances')
    appliancesInputSelect.updateOptions(appliancesOptions, 'appliances')
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsInputSelect.value, 'ingredients')
    ingredientsInputSelect.updateOptions(ingredientsOptions, 'ingredients')
}

function closeAllOptionsContainers(){
    ingredientsInputSelect.reset()
    ustensilsInputSelect.reset()
    appliancesInputSelect.reset()
}

function emptyInputSelects(){
    appliancesInputSelect.value = ""
    ustensilsInputSelect.value = ""
    ingredientsInputSelect.value = ""
}

function getOptionsListOutOfRecipes(filterWord, targetOptionsType){ // filtering the options when something is typed into the select input
    const postBasicFilteringChainRecipes = filteringChain.fullResolution()

    let filteredOptions
    if (targetOptionsType === 'appliances') return filteredOptions = [...postBasicFilteringChainRecipes.appliancesList].filter(appliance => Comparators.doesOptionMatchInputValue(appliance, filterWord))
    if (targetOptionsType === 'ingredients') return filteredOptions = [...postBasicFilteringChainRecipes.ingredientsList].filter(ingredient => Comparators.doesOptionMatchInputValue(ingredient, filterWord))
    return filteredOptions = [...postBasicFilteringChainRecipes.ustensilsList].filter(ustensil => Comparators.doesOptionMatchInputValue(ustensil, filterWord))
}

//----------------------------------------------
// Recipes gallery initial render
//----------------------------------------------
recipesGallery.refresh(adaptedRecipes)

export {updateAllOptions, closeAllOptionsContainers}

// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances
// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array
// user flat or flat map with ?.name, ?.ingredients, etc...


//----------------------------------------------
// events triggered when an option is selected
//----------------------------------------------
/*ingredientsSelect.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ingredients'})).renderShelf() // add a tag to the shelf and update the shelf
    const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ?
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes) // refresh the recipes gallery
})

appliancesSelect.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'appliances'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes)
})

ustensilsSelect.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ustensils'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes)
})*/