import recipes from "../../datas/recipes.js";
import RecipesList from "../blueprints/recipesList.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { normalize } from "./stringUtils.js";

const filteringChain = {
    allRecipes : [...recipes], // no ref, ie duplicate

    postSearchFilteringRecipes : function(){
        if (searchBar.isEmpty === true) return [...this.allRecipes]
        const filteredRecipes = this.allRecipes.filter(recipe => {
            return doesRecipeNameContains(recipe, searchBar.value) || doesRecipeDescriptionContains(recipe, searchBar.value) || doesRecipeIngredientsContain(recipe, searchBar.value) // passer en arg?
        })
        return filteredRecipes
    },

    recursiveFiltering : function (tagsArray, currentRecipes, callbackFilterFn){ // multiple tags = successive filterings
        let filteredRecipes = [...currentRecipes]
        let tagsArrayCopy = [...tagsArray]
        if(tagsArray.length>0){
            filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[0].name))
            tagsArrayCopy.shift() // get rid of the first tag cause treated
            this.recursiveFiltering(tagsArrayCopy, filteredRecipes, callbackFilterFn)
        }
        console.log('return : ', filteredRecipes)
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

    },

    postUstensilsFilteringRecipes : function(){
        let currentRecipes = this.postAppliancesFilteringRecipes()
        const activeUstensilsTags = tagsShelf.getTagsFromType('ustensils')
        if(activeUstensilsTags.length===0) return currentRecipes
    },

    fullResolution : function(){
        // console.log(this.postUstensilsFilteringRecipes())
        return this.postUstensilsFilteringRecipes()
    },

    //move filter index with next()
}

/* Filtering Tools */

function doesRecipeNameContains(recipe, lookedForText){
    return normalize(recipe.name).includes(normalize(lookedForText))
}

function doesRecipeDescriptionContains(recipe, lookedForText){
    return normalize(recipe.description).includes(normalize(lookedForText))
}

function doesRecipeIngredientsContain(recipe, lookedForText){
    return recipe.ingredients.filter(ingredient => normalize(ingredient.ingredient).includes(normalize(lookedForText))).length > 0
}

export default filteringChain