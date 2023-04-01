import { normalize, FirstLetterMaj } from "../utils/stringUtils.js" 

const searchBar = function (node){
    this.node = node
}

searchBar.prototype.filtering = function(recipes, filteringArgument){
    return recipes.filter(recipe => {
        return doesRecipeNameContains(recipe, filteringArgument) || doesRecipeDescriptionContains(recipe, filteringArgument) || doesRecipeIngredientsContain(recipe, filteringArgument)
    })
}

function doesRecipeNameContains(recipe, text){
    return normalize(recipe.name).includes(normalize(text))
}

function doesRecipeDescriptionContains(recipe, text){
    return normalize(recipe.description).includes(normalize(text))
}

function doesRecipeIngredientsContain(recipe, text){
    return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(text))).length > 0
}

export default searchBar