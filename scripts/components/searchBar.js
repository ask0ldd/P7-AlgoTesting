import { normalize, FirstLetterMaj } from "../utils/stringUtils.js" 

const SearchBar = function (selector){
    this.node = document.querySelector(selector)
}

SearchBar.prototype.filtering = function(recipes, filteringArgument){
    return recipes.filter(recipe => {
        return doesRecipeNameContains(recipe, filteringArgument) || doesRecipeDescriptionContains(recipe, filteringArgument) || doesRecipeIngredientsContain(recipe, filteringArgument)
    })
}

SearchBar.prototype.listenForInput = function(){

}

function doesRecipeNameContains(recipe, lookedForText){
    return normalize(recipe.name).includes(normalize(lookedForText))
}

function doesRecipeDescriptionContains(recipe, lookedForText){
    return normalize(recipe.description).includes(normalize(lookedForText))
}

function doesRecipeIngredientsContain(recipe, lookedForText){
    return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(lookedForText))).length > 0
}

export default SearchBar