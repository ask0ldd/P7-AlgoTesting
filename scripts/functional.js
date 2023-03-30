let activeRecipes = recipes

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

function intersectTwoRecipesArrays(recipesArray1, recipesArray2){
    // iterate on the smaller array for optimisation purposes
    return recipesArray1.length < recipesArray2.length ? recipesArray1.filter(recipe => recipesArray2.includes(recipe)) : recipesArray2.filter(recipe => recipesArray1.includes(recipe))
}

const searchBar = document.querySelector('.mainSearchBar')
const resultsContainer = document.querySelector('.searchResults')

searchBar.addEventListener('input', (e) => {
    if(searchBar.value.length>2) {
        activeRecipes = searchbarFiltering(recipes, searchBar.value)
    }else{
        activeRecipes = recipes
    }
    resultsContainer.innerHTML = activeRecipes.reduce((accu, recipe) => accu + `<article>${recipe?.id}<br>${recipe?.name}<br>${recipe?.description}</article>`, '')
})

console.log(intersectTwoRecipesArrays(recipes, activeRecipes))