import searchBar from "./components/searchBar.js"
import recipes from "../datas/recipes.js"
import RecipesAdapter from "./adapters/recipesAdapter.js"
import filteringChain from "./services/filteringChain.js"
import recipesGallery from "./components/recipesGallery.js"
import { Comparators } from "./services/comparators.js"
import CustomSelect from "./blueprints/customSelect.js"

if(!recipes || recipes.length<1) {throw new Error('No recipes available.')}

const adaptedRecipes = new RecipesAdapter(recipes)
Object.freeze(adaptedRecipes)

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
appliancesSelect.inputNode.addEventListener('input', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
})

appliancesSelect.inputNode.addEventListener('focus', () => {
    const appliancesOptions = getOptionsListOutOfRecipes(appliancesSelect.input.value, 'appliances')
    appliancesSelect.updateOptions(appliancesOptions, 'appliances')
    appliancesSelect.displayOptionsContainer()
})

appliancesSelect.inputNode.addEventListener('blur', () => {
    appliancesSelect.close()
})

ustensilsSelect.inputNode.addEventListener('input', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsSelect.input.value, 'ustensils')
    ustensilsSelect.updateOptions(ustensilesOptions, 'ustensils')
})

ustensilsSelect.inputNode.addEventListener('focus', () => {
    const ustensilesOptions = getOptionsListOutOfRecipes(ustensilsSelect.input.value, 'ustensils')
    ustensilsSelect.updateOptions(ustensilesOptions, 'ustensils')
    ustensilsSelect.displayOptionsContainer()
})

ustensilsSelect.inputNode.addEventListener('blur', () => {
    ustensilsSelect.close()
})

ingredientsSelect.inputNode.addEventListener('input', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsSelect.input.value, 'ingredients')
    ingredientsSelect.updateOptions(ingredientsOptions, 'ingredients')
})

ingredientsSelect.inputNode.addEventListener('focus', () => {
    const ingredientsOptions = getOptionsListOutOfRecipes(ingredientsSelect.input.value, 'ingredients')
    ingredientsSelect.updateOptions(ingredientsOptions, 'ingredients')
    ingredientsSelect.displayOptionsContainer()
})

ingredientsSelect.inputNode.addEventListener('blur', () => {
    ingredientsSelect.close()
})

//----------------------------------------------
// clicking on a select container switch the focus to the related input
//----------------------------------------------
appliancesSelect.containerNode.addEventListener('mousedown', (e)=>{
    e.preventDefault()
    appliancesSelect.rotateArrow()
    appliancesSelect.input.focus()
})

ustensilsSelect.containerNode.addEventListener('mousedown', (e)=>{
    e.preventDefault()
    ustensilsSelect.rotateArrow()
    ustensilsSelect.input.focus()
})

ingredientsSelect.containerNode.addEventListener('mousedown', (e)=>{
    e.preventDefault()
    ingredientsSelect.rotateArrow()
    ingredientsSelect.input.focus()
})

//----------------------------------------------
// Various Fn
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

// filtering the options when something is typed into the select input
function getOptionsListOutOfRecipes(filterWord, targetOptionsType){ 
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