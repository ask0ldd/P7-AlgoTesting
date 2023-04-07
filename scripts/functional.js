import searchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesAdapter from "./adapters/recipesAdapter.js"
import Select from "./blueprints/select.js"
import tagsShelf from "./components/tagsShelf.js"
import tagsFactory from "./factory/tagsFactory.js"
import filteringChain from "./utils/filteringChain.js"
import recipesGallery from "./components/recipesGallery.js"

let allRecipes = recipes

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
const appliancesSelect = new Select('#select-appareils')
const ustensilsSelect = new Select('#select-ustensiles')
const ingredientsSelect = new Select('#select-ingredients')

updateAllSelects({appliances : adaptedRecipes.allAppliances, ustensils : adaptedRecipes.allUstensils, ingredients : adaptedRecipes.allIngredients})

/* events triggered when an option is selected */
ingredientsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ingredients'})).renderShelf() // add a tag to the shelf and update it
    const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ? yes
    updateAllSelects({appliances : filteredRecipes.allAppliances, ustensils : filteredRecipes.allUstensils, ingredients : filteredRecipes.allIngredients})
    recipesGallery.refresh(filteredRecipes) // refresh the recipes gallery
})

appliancesSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'appliances'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.allAppliances, ustensils : filteredRecipes.allUstensils, ingredients : filteredRecipes.allIngredients})
    recipesGallery.refresh(filteredRecipes)
})

ustensilsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ustensils'})).renderShelf()
    const filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.allAppliances, ustensils : filteredRecipes.allUstensils, ingredients : filteredRecipes.allIngredients})
    recipesGallery.refresh(filteredRecipes)
})

/* events triggered when typing into the searchbar */
searchBar.node.addEventListener('input', (e) => {
    let filteredRecipes
    filteredRecipes = filteringChain.fullResolution()
    updateAllSelects({appliances : filteredRecipes.allAppliances, ustensils : filteredRecipes.allUstensils, ingredients : filteredRecipes.allIngredients})
    recipesGallery.refresh(filteredRecipes)
})

/* recipes gallery first render */
recipesGallery.refresh(adaptedRecipes)

// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances
// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array
// user flat or flat map with ?.name, ?.ingredients, etc...

export {appliancesSelect, ustensilsSelect, ingredientsSelect}