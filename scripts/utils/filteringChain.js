import recipes from "../../datas/recipes.js";
import RecipesAdapter from "../adapters/recipesAdapter.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { normalize } from "./stringUtils.js";

const filteringChain = {
    allRecipes : [...recipes], // no ref, ie duplicate

    // !!! inputs  + selects should be part of the filteringchain?

    next: function(recipe){
        return recipe
    },

    postSearchFilteringRecipes : function(){
        //if (searchBar.isEmpty === true) 
        if (searchBar.value.length < 3) return [...this.allRecipes] /* 3 characters mins to be taken into account */
        const filteredRecipes = this.allRecipes.filter(recipe => {
            return doesRecipeNameContains(recipe, searchBar.value) || doesRecipeDescriptionContains(recipe, searchBar.value) || doesRecipeIngredientsContain(recipe, searchBar.value) // passer en arg?
        })
        // filtered recipes => sent to the following filter / autocompletion input => update the displayed options only
        return filteredRecipes
    },

    recursiveFiltering : function (tagsArray, currentRecipes, callbackFilterFn){ // multiple tags = successive filterings
        let filteredRecipes = [...currentRecipes]
        let tagsArrayCopy = [...tagsArray]
        if(tagsArray.length>0){
            filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[0].name))
            tagsArrayCopy.shift() // get rid of the first tag cause treated
            return this.recursiveFiltering(tagsArrayCopy, filteredRecipes, callbackFilterFn) // return to not let the funcion execute itself any longer
        }
        return filteredRecipes
    },

    /*recursiveFiltering : function (tagsArray, index, currentRecipes, callbackFilterFn){ // multiple tags = successive filterings
        if(index>=tagsArray.length) return [...currentRecipes]
        let filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[index].name))
        this.recursiveFiltering(tagsArray, index+1, [...filteredRecipes], callbackFilterFn)
    },*/

    postIngredientsFilteringRecipes : function(){
        // get datas filtered through searchbar
        let currentRecipes = this.postSearchFilteringRecipes()
        const activeIngredientsTags = tagsShelf.getTagsFromType('ingredients')
        if(activeIngredientsTags.length===0) return currentRecipes
        //let index = 0
        const filteredRecipes = this.recursiveFiltering(activeIngredientsTags, currentRecipes, doesRecipeIngredientsContain)
        return filteredRecipes
    },

    postAppliancesFilteringRecipes : function(){
        let currentRecipes = this.postIngredientsFilteringRecipes()
        const activeAppliancesTags = tagsShelf.getTagsFromType('appliances')
        if(activeAppliancesTags.length===0) return currentRecipes
        const filteredRecipes = this.recursiveFiltering(activeAppliancesTags, currentRecipes, isRecipeAppliance)
        return filteredRecipes
    },

    postUstensilsFilteringRecipes : function(){
        let currentRecipes = this.postAppliancesFilteringRecipes()
        const activeUstensilsTags = tagsShelf.getTagsFromType('ustensils')
        if(activeUstensilsTags.length===0) return currentRecipes
        const filteredRecipes = this.recursiveFiltering(activeUstensilsTags, currentRecipes, doesRecipeUstensilsContain)
        return filteredRecipes
    },

    fullResolution : function(){
        return new RecipesAdapter(this.postUstensilsFilteringRecipes())
    },

    //move filter index with next()
}

/* Comparators */

function doesRecipeNameContains(recipe, searchedForText){
    return normalize(recipe.name).includes(normalize(searchedForText))
}

function doesRecipeDescriptionContains(recipe, searchedForText){
    return normalize(recipe.description).includes(normalize(searchedForText))
}

function doesRecipeIngredientsContain(recipe, searchedForText){
    return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(searchedForText))).length > 0
}

function isRecipeAppliance(recipe, searchedForAppliance){
    return (normalize(recipe.appliance)===normalize(searchedForAppliance))
}

function doesRecipeUstensilsContain(recipe, searchedForUstensil){
    return recipe.ustensils.filter(ustensil => normalize(ustensil).includes(normalize(searchedForUstensil))).length > 0
}

export default filteringChain