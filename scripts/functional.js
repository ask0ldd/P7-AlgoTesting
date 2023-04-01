import SearchBar from "./components/searchBar.js"
import { normalize, FirstLetterMaj } from "./utils/stringUtils.js"
import recipes from "../datas/recipes.js"
import RecipesModel from "./blueprints/recipesModel.js"
import appliancesSelect from "./components/appliancesSelect.js"

let allRecipes = recipes
/*let afterSearchRecipes
let afterFilterIngredientsRecipes
let afterFilterAppliancesRecipes
let afterFilteUstencilsRecipes*/
let activeRecipes = recipes

let recipesArray = [{"active" : recipes}, {"postSearchFilter": []}, {"postIngredientsFilter": []}, {"postAppliancesFilter": []}, {"postUstencilsFilter": []}]

function removeDuplicates(array){
    return array.filter((element, index, array) => array.indexOf(element) === index)
}

/* 
extract ingredients from activerecipes to populate the ingredients select 
*/
function updateIngredientsSelect(activeRecipes){
    const ingredients = activeRecipes.reduce((accu, recipe) => {
        // spreading an ingredients array of a recipe & extracting only the ingredient values out of the subelements (= ignore quantity & unit)
        (recipe.ingredients).flatMap( element => accu.add(element?.ingredient))
        // equivalent : [...recipe.ingredients].forEach( element => accu.add(element?.ingredient)) 
        return accu
    }, new Set())

    ingredientsSelect.innerHTML = Array.from(ingredients).reduce((accu, ingredient) => accu+`<option value="${ingredient.toLowerCase()}">${FirstLetterMaj(ingredient)}</option>`, '')
}

/* 
extract ingredients from activerecipes to populate the appliance select 
*/
function updateAppliancesSelect(activeRecipes){
    const appliances = activeRecipes.reduce((accu, recipe, index, array) => 
    {
        // condition : if not already in accu, then push it
        accu.add(recipe.appliance.toLowerCase())
        return accu 
    }, new Set()) // using a set so no duplicates

    // format the retrieved appliances as a group of <options> and push it to the select
    appliancesSelect.innerHTML = Array.from(appliances).reduce((accu, appliance) => accu+`<option value="${appliance.toLowerCase()}">${FirstLetterMaj(appliance)}</option>`, '')
}

/* 
extract ustencils from activerecipes to populate the ustensils select 
*/
function updateUstensilsSelect(activeRecipes){
    // get all ustensils from activeRecipes
    const ustensils = activeRecipes.reduce((accu, recipe) => {
        // try adding to the set every ustensil in the ustensils array
        recipe.ustensils.forEach(ustensil => accu.add(ustensil)) 
        return accu
    }, new Set())
    
    // format the retrieved ustensils as a group of <options> and push it to the select
    ustensilsSelect.innerHTML = Array.from(ustensils).reduce((accu, ustensil) => accu+`<option value="${ustensil.toLowerCase()}">${FirstLetterMaj(ustensil)}</option>`, '')
}


function intersectTwoRecipesArrays(recipesArray1, recipesArray2){
    // iterate on the smaller array for optimisation purposes
    return recipesArray1.length < recipesArray2.length ? recipesArray1.filter(recipe => recipesArray2.includes(recipe)) : recipesArray2.filter(recipe => recipesArray1.includes(recipe))
}

//const searchBarNode = document.querySelector('.mainSearchBar')
const resultsContainer = document.querySelector('.searchResults')
// const appliancesSelect = document.querySelector('#select-appareils')
const ustensilsSelect = document.querySelector('#select-ustensiles')
const ingredientsSelect = document.querySelector('#select-ingredients')
const searchBar = new SearchBar('.mainSearchBar')
const recipesInstance = new RecipesModel(recipes)
appliancesSelect.optionsUpdate(recipesInstance.appliances)


/*searchBar.node.addEventListener('input', (e) => {
    if(searchBar.node.value.length>2) {
        activeRecipes = searchBar.filtering(recipes, searchBar.node.value)
        updateIngredientsSelect(activeRecipes)
        updateAppliancesSelect(activeRecipes)
        updateUstensilsSelect(activeRecipes)
    }else{
        activeRecipes = recipes
    }
    resultsContainer.innerHTML = activeRecipes.reduce((accu, recipe) => accu + `<article>${recipe?.id}<br>${recipe?.name}<br>${recipe?.description}</article>`, '')
})*/

console.log(intersectTwoRecipesArrays(recipes, activeRecipes))


// recipes > filter searchbar > filter ingredients > filter ustencils > filter appliances
// then display recipes > update ingredients / ustencils > appliances

// il ne peut y avoir qu'un appliance / ingredients multiples et dans un array / ustensils dans un array


// user flat or flat map with ?.name, ?.ingredients, etc...