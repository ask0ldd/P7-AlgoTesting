import searchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesList from "./blueprints/recipesList.js"
import Select from "./blueprints/select.js"
import recipeFactory from "./factory/recipesFactory.js"
import tagsShelf from "./components/tagsShelf.js"
import tagsFactory from "./factory/tagsFactory.js"

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

const resultsContainer = document.querySelector('.searchResults')
const recipesInstance = new RecipesList(recipes)
const appliancesSelect = new Select('#select-appareils')
const ustensilsSelect = new Select('#select-ustensiles')
const ingredientsSelect = new Select('#select-ingredients')

appliancesSelect.optionsUpdate(recipesInstance.appliances)
ustensilsSelect.optionsUpdate(recipesInstance.ustensils)
ingredientsSelect.optionsUpdate(recipesInstance.ingredients)

ingredientsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ingredients'})).renderShelf()
})

appliancesSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'appliances'})).renderShelf()
})

ustensilsSelect.node.addEventListener('change', (e) => {
    tagsShelf.add(tagsFactory({tagName : e.target.value, tagType : 'ustensils'})).renderShelf()
})


searchBar.node.addEventListener('input', (e) => {
    let filteredRecipes
    if(searchBar.node.value.length>2) {
        filteredRecipes = new RecipesList(searchBar.filtering(recipes, searchBar.node.value))
        appliancesSelect.optionsUpdate(filteredRecipes.appliances)
        ustensilsSelect.optionsUpdate(filteredRecipes.ustensils)
        ingredientsSelect.optionsUpdate(filteredRecipes.ingredients)
    }else{
        filteredRecipes = new RecipesList(recipes)
        appliancesSelect.optionsUpdate(filteredRecipes.appliances)
        ustensilsSelect.optionsUpdate(filteredRecipes.ustensils)
        ingredientsSelect.optionsUpdate(filteredRecipes.ingredients)
    }
    
    resultsContainer.innerHTML = filteredRecipes.list.reduce((accu, recipe) => accu + recipeFactory.generateCard(recipe), '')
})

// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances
// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array
// user flat or flat map with ?.name, ?.ingredients, etc...