import { normalize } from "./stringUtils.js"

export function doesRecipeNameContains(recipe, searchedForText){
    return normalize(recipe.name).includes(normalize(searchedForText))
}

export function doesRecipeDescriptionContains(recipe, searchedForText){
    return normalize(recipe.description).includes(normalize(searchedForText))
}

export function doesRecipeIngredientsContain(recipe, searchedForText){
    return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(searchedForText))).length > 0
}

export function isRecipeAppliance(recipe, searchedForAppliance){
    return (normalize(recipe.appliance)===normalize(searchedForAppliance))
}

export function doesRecipeUstensilsContain(recipe, searchedForUstensil){
    return recipe.ustensils.filter(ustensil => normalize(ustensil).includes(normalize(searchedForUstensil))).length > 0
}

export function doesOptionMatchInputValue(option, inputValue){
    return normalize(option).includes(normalize(inputValue))
}