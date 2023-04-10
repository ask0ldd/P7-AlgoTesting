import searchBar from "./components/searchBar.js"
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

const appliancesSelect = new CustomSelect({
    selectContainerNode : document.querySelector("#appareils-container"), 
    selectInputNode : document.querySelector('#input-appareils'), 
    optionsContainerNode : document.querySelector('#options-appareils')
})
appliancesSelect.input.definePlaceholder({byDefault : 'Appareils', onFocus : 'Rechercher un appareil'})

const ustensilsSelect = new CustomSelect({
    selectContainerNode : document.querySelector("#ustensiles-container"), 
    selectInputNode : document.querySelector('#input-ustensiles'), 
    optionsContainerNode : document.querySelector('#options-ustensiles')
})
ustensilsSelect.input.definePlaceholder({byDefault : 'Ustensiles', onFocus : 'Rechercher un ustensile'})

const ingredientsSelect = new CustomSelect({
    selectContainerNode : document.querySelector("#ingredients-container"), 
    selectInputNode : document.querySelector('#input-ingredients'), 
    optionsContainerNode : document.querySelector('#options-ingredients')
})
ingredientsSelect.input.definePlaceholder({byDefault : 'Ingredients', onFocus : 'Rechercher un ingredient'})

//----------------------------------------------
// events triggered when typing into the searchbar
//----------------------------------------------
searchBar.addEventListener('input', (e) => {
    emptySelectsInput()
    let filteredRecipes
    filteredRecipes = filteringChain.fullResolution()
    recipesGallery.refresh(filteredRecipes)
})

//----------------------------------------------
// events triggered when typing into the inputs
// N.B. : Basic Filtering Chain = search input + tags filtering
//----------------------------------------------
appliancesSelect.input.addEventListener('input', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
})

appliancesSelect.input.addEventListener('focus', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
    appliancesSelect.input.focus()
    appliancesSelect.displayOptionsContainer()
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
    ustensilsSelect.displayOptionsContainer()
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
    ingredientsSelect.displayOptionsContainer()
})

ingredientsSelect.input.addEventListener('focusout', () => {
    closeAllOptionsContainers()
})

//----------------------------------------------
// Fn
//----------------------------------------------

function closeAllOptionsContainers(){
    ingredientsSelect.reset()
    ustensilsSelect.reset()
    appliancesSelect.reset()
    ingredientsSelect.hideOptionsContainer()
    ustensilsSelect.hideOptionsContainer()
    appliancesSelect.hideOptionsContainer()
}

function emptySelectsInput(){
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

export { closeAllOptionsContainers }

// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances
// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array
// user flat or flat map with ?.name, ?.ingredients, etc...