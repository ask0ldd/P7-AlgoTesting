import { normalize } from "./stringUtils.js"

export const Comparators = {

    doesRecipeNameContains(recipe, searchedForText){
        return normalize(recipe.name).includes(normalize(searchedForText))
    },

    doesRecipeDescriptionContains(recipe, searchedForText){
        return normalize(recipe.description).includes(normalize(searchedForText))
    },

    doesRecipeIngredientsContain(recipe, searchedForText){
        return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(searchedForText))).length > 0
    },

    isRecipeAppliance(recipe, searchedForAppliance){
        return (normalize(recipe.appliance)===normalize(searchedForAppliance))
    },

    doesRecipeUstensilsContain(recipe, searchedForUstensil){
        return recipe.ustensils.filter(ustensil => normalize(ustensil).includes(normalize(searchedForUstensil))).length > 0
    },

    doesOptionMatchInputValue(option, inputValue){
        return normalize(option).includes(normalize(inputValue))
    },
}