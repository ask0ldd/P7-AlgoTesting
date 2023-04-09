import searchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesAdapter from "./adapters/recipesAdapter.js"
import filteringChain from "./utils/filteringChain.js"
import recipesGallery from "./components/recipesGallery.js"
import { Comparators } from "./utils/comparators.js"
import CustomSelect from "./blueprints/customSelect.js"

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
/*const appliancesInputSelect = new InputSelect('#input-appareils', '#select-appareils', '#options-appareils', 'Rechercher un appareil', 'Appareils') // should passe array to be more explicit
const ustensilsInputSelect = new InputSelect('#input-ustensiles', '#select-ustensiles', '#options-ustensiles', 'Rechercher un ustensile', 'Ustensiles')
const ingredientsInputSelect = new InputSelect('#input-ingredients', '#select-ingredients', '#options-ingredients', 'Rechercher un ingredient', 'Ingredients')*/
const selectContainerNodeA = document.querySelector("#appareils-container")
const selectInputNodeA = document.querySelector('#input-appareils')
const optionsContainerNodeA = document.querySelector('#options-appareils')
const appliancesSelect = new CustomSelect(selectContainerNodeA, selectInputNodeA, optionsContainerNodeA)
appliancesSelect.input.defineDefaultPlaceholder('Appareils')
appliancesSelect.input.defineOnFocusPlaceholder('Rechercher un appareil')
const selectContainerNodeB = document.querySelector("#ustensiles-container")
const selectInputNodeB = document.querySelector('#input-ustensiles')
const optionsContainerNodeB = document.querySelector('#options-ustensiles')
const ustensilsSelect = new CustomSelect(selectContainerNodeB, selectInputNodeB, optionsContainerNodeB)
ustensilsSelect.input.defineDefaultPlaceholder('Ustensiles')
ustensilsSelect.input.defineOnFocusPlaceholder('Rechercher un ustensile')
const selectContainerNodeC = document.querySelector("#ingredients-container")
const selectInputNodeC = document.querySelector('#input-ingredients')
const optionsContainerNodeC = document.querySelector('#options-ingredients')
const ingredientsSelect = new CustomSelect(selectContainerNodeC, selectInputNodeC, optionsContainerNodeC)
ingredientsSelect.input.defineDefaultPlaceholder('Ingredients')
ingredientsSelect.input.defineOnFocusPlaceholder('Rechercher un ingredient')

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
appliancesSelect.input.addEventListener('input', () => { // get rid of node
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
})

appliancesSelect.input.addEventListener('focus', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
    appliancesSelect.input.focus()
})

appliancesSelect.input.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

ustensilsSelect.input.addEventListener('input', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsSelect.input.value, 'ustensils')
    ustensilsSelect.updateOptions(ustensilesOptions, 'ustensils')
})

ustensilsSelect.input.addEventListener('focus', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsSelect.input.value, 'ustensils')
    ustensilsSelect.updateOptions(ustensilesOptions, 'ustensils')
    ustensilsSelect.input.focus()
})

ustensilsSelect.input.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

ingredientsSelect.input.addEventListener('input', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsSelect.input.value, 'ingredients')
    ingredientsSelect.updateOptions(ingredientsOptions, 'ingredients')
})

ingredientsSelect.input.addEventListener('focus', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsSelect.input.value, 'ingredients')
    ingredientsSelect.updateOptions(ingredientsOptions, 'ingredients')
    ingredientsSelect.input.focus()
})

ingredientsSelect.input.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

//----------------------------------------------
// Fn
//----------------------------------------------
function updateAllOptions(recipes){ // throw error si recipes missing
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsInputSelect.value, 'ustensils') // !!! should pass recipes as a parameter
    ustensilsSelect.updateOptions(ustensilesOptions, 'ustensils')
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesInputSelect.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsInputSelect.value, 'ingredients')
    ingredientsSelect.updateOptions(ingredientsOptions, 'ingredients')
}

function closeAllOptionsContainers(){
    ingredientsSelect.reset()
    ustensilsSelect.reset()
    appliancesSelect.reset()
}

function emptyInputSelects(){
    appliancesSelect.input.value = ""
    ustensilsSelect.input.value = ""
    ingredientsSelect.input.value = ""
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