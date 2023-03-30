let activeRecipes = recipes

function isRecipeNameIncluding(recipe, text){
    return recipe.name.toLowerCase().trim().includes(text)
}

function isRecipeDescriptionIncluding(recipe, text){
    return recipe.description.toLowerCase().trim().includes(text)
}

function areRecipeIngredientsIncluding(recipe, text){
    return recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().trim().includes(text)).length > 0
}

function searchbarFiltering(recipes, filter){
    return recipes.filter(recipe => {
        return isRecipeNameIncluding(recipe, filter) || isRecipeDescriptionIncluding(recipe, filter) || areRecipeIngredientsIncluding(recipe, filter)
    })
}

const searchBar = document.querySelector('.mainSearchBar')
searchBar.addEventListener('input', (e) => {
    if(searchBar.value.length>2) {
        activeRecipes = searchbarFiltering(recipes, searchBar.value)
        console.log('RESULTS : ', activeRecipes)
    }
})