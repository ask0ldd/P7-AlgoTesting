import searchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesAdapter from "./adapters/recipesAdapter.js"
import Select from "./blueprints/select.js"
import tagsShelf from "./components/tagsShelf.js"
import tagsFactory from "./factory/tagsFactory.js"
import filteringChain from "./utils/filteringChain.js"
import recipesGallery from "./components/recipesGallery.js"
import InputSelect from "./blueprints/inputSelect.js"
import { doesRecipeUstensilsContain, doesOptionMatchInputValue, doesRecipeIngredientsContain, isRecipeAppliance } from "./utils/comparators.js"

/*function removeDuplicates(array){
    return array.filter((element, index, array) => array.indexOf(element) === index)
}

function intersectTwoRecipesArrays(recipesArray1, recipesArray2){
    // iterate on the smaller array for optimisation purposes
    return recipesArray1.length < recipesArray2.length ? 
    recipesArray1.filter(recipe => recipesArray2.includes(recipe)) : 
    recipesArray2.filter(recipe => recipesArray1.includes(recipe))
}*/

function updateAllSelects(selects) {
    appliancesSelect.optionsUpdate(selects.appliances)
    ustensilsSelect.optionsUpdate(selects.ustensils)
    ingredientsSelect.optionsUpdate(selects.ingredients)
}

const adaptedRecipes = new RecipesAdapter(recipes)
Object.freeze(adaptedRecipes) // implement deepfreeze
const appliancesSelect = new Select('#select-appareils')
const ustensilsSelect = new Select('#select-ustensiles')
const ingredientsSelect = new Select('#select-ingredients')
const appliancesInputSelect = new InputSelect('#input-appareils', '#select-appareils')
const ustensilsInputSelect = new InputSelect('#input-ustensiles', '#select-ustensiles')
const ingredientsInputSelect = new InputSelect('#input-ingredients', '#select-ingredients')

updateAllSelects({appliances : adaptedRecipes.appliancesList, ustensils : adaptedRecipes.ustensilsList, ingredients : adaptedRecipes.ingredientsList})

//----------------------------------------------
// events triggered when an option is selected
//----------------------------------------------
ingredientsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ingredients'})).renderShelf() // add a tag to the shelf and update the shelf
    const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ?
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes) // refresh the recipes gallery
})

appliancesSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'appliances'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes)
})

ustensilsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ustensils'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes)
})

//----------------------------------------------
// events triggered when typing into the searchbar
//----------------------------------------------
searchBar.node.addEventListener('input', (e) => {
    let filteredRecipes
    filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.appliancesList, ustensils : filteredRecipes.ustensilsList, ingredients : filteredRecipes.ingredientsList})
    recipesGallery.refresh(filteredRecipes)
})

//----------------------------------------------
// events triggered when typing into the select inputs
// N.B. : Basic Filtering Chain = search input + tags filtering
//----------------------------------------------
appliancesInputSelect.node.addEventListener('input', () => {
    const inputFilteredAppliances = filterTargetSelectOptions(appliancesInputSelect.value, 'appliances')
    appliancesSelect.optionsUpdate(inputFilteredAppliances)
})

ustensilsInputSelect.node.addEventListener('input', () => {
    const inputFilteredUstensils = filterTargetSelectOptions(ustensilsInputSelect.value, 'ustensils')
    ustensilsSelect.optionsUpdate(inputFilteredUstensils)
})


ingredientsInputSelect.node.addEventListener('input', () => {
    const inputFilteredIngredients = filterTargetSelectOptions(ingredientsInputSelect.value, 'ingredients')
    ingredientsSelect.optionsUpdate(inputFilteredIngredients)
})

function filterTargetSelectOptions(filterWord, targetOptionsType){ // filtering the options when something is typed into the select input
    const postBasicFilteringChainRecipes = filteringChain.fullResolution()

    let filteredOptions
    if (targetOptionsType === 'appliances') return filteredOptions = [...postBasicFilteringChainRecipes.appliancesList].filter(appliance => doesOptionMatchInputValue(appliance, filterWord))
    if (targetOptionsType === 'ingredients') return filteredOptions = [...postBasicFilteringChainRecipes.ingredientsList].filter(ingredient => doesOptionMatchInputValue(ingredient, filterWord))
    return filteredOptions = [...postBasicFilteringChainRecipes.ustensilsList].filter(ustensil => doesOptionMatchInputValue(ustensil, filterWord))
}

//----------------------------------------------
// Recipes gallery initial render
//----------------------------------------------
recipesGallery.refresh(adaptedRecipes)

export {appliancesSelect, ustensilsSelect, ingredientsSelect}

// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances
// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array
// user flat or flat map with ?.name, ?.ingredients, etc...