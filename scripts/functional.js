let activeRecipes = recipes

function removeDuplicates(array){
    return array.filter((element, index, array) => array.indexOf(element) === index)
}

function FirstLetterMaj(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* 
searchbar algo 
*/
function doesRecipeNameContains(recipe, text){
    return recipe.name.toLowerCase().trim().includes(text)
}

function doesRecipeDescriptionContains(recipe, text){
    return recipe.description.toLowerCase().trim().includes(text)
}

function doesRecipeIngredientsContain(recipe, text){
    return recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().trim().includes(text)).length > 0
}

function searchbarFiltering(recipes, filter){
    return recipes.filter(recipe => {
        return doesRecipeNameContains(recipe, filter) || doesRecipeDescriptionContains(recipe, filter) || doesRecipeIngredientsContain(recipe, filter)
    })
}

/* 
extract ingredients from activerecipes to populate the ingredients select 
*/

/* 
extract ingredients from activerecipes to populate the appliance select 
*/
function updateAppliancesSelect(activeRecipes){
    appliancesSelect.innerHTML = activeRecipes.reduce((accu, recipe) => accu+`<option value="${recipe.id}">${FirstLetterMaj(recipe.appliance)}</option>`, '')
}

/* 
extract ingredients from activerecipes to populate the ustensils select 
*/
function updateUstencilsSelect(activeRecipes){
    // get all ustensils from activeRecipes
    const ustensils = removeDuplicates(activeRecipes.reduce((accu, recipe) => {
        accu.push(...recipe.ustensils)
        return accu
    }, []))
    // ustensilsSelect.innerHTML = activeRecipes.reduce((accu, recipe) => accu+`<option value="${recipe.id}">${recipe.ustensils}</option>`, '')
    ustensilsSelect.innerHTML = ustensils.reduce((accu, ustensil) => accu+`<option value="${ustensil}">${FirstLetterMaj(ustensil)}</option>`, '')
}


function intersectTwoRecipesArrays(recipesArray1, recipesArray2){
    // iterate on the smaller array for optimisation purposes
    return recipesArray1.length < recipesArray2.length ? recipesArray1.filter(recipe => recipesArray2.includes(recipe)) : recipesArray2.filter(recipe => recipesArray1.includes(recipe))
}

const searchBar = document.querySelector('.mainSearchBar')
const resultsContainer = document.querySelector('.searchResults')
const appliancesSelect = document.querySelector('#select-appareils')
const ustensilsSelect = document.querySelector('#select-ustensiles')

searchBar.addEventListener('input', (e) => {
    if(searchBar.value.length>2) {
        activeRecipes = searchbarFiltering(recipes, searchBar.value)
    }else{
        activeRecipes = recipes
    }
    resultsContainer.innerHTML = activeRecipes.reduce((accu, recipe) => accu + `<article>${recipe?.id}<br>${recipe?.name}<br>${recipe?.description}</article>`, '')
    updateAppliancesSelect(activeRecipes)
    updateUstencilsSelect(activeRecipes)
})

console.log(intersectTwoRecipesArrays(recipes, activeRecipes))