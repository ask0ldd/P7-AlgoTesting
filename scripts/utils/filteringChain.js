import recipes from "../../datas/recipes.js";
import RecipesList from "../blueprints/recipesList.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { normalize } from "./stringUtils.js";

const filteringChain = {
    unalteredRecipes : [...recipes], // no ref, ie duplicate

    postSearchFilteringRecipes : function(){
        let recipes = [...this.unalteredRecipes]
        return recipes.filter(recipe => {
            return doesRecipeNameContains(recipe, searchBar.node.value) || doesRecipeDescriptionContains(recipe, searchBar.node.value) || doesRecipeIngredientsContain(recipe, searchBar.node.value) // passer en arg?
        })
    },

    recursiveFiltering : function (tagsArray, index, recipes, callbackFilterFn){
        let filteredRecipes = recipes
        if(index<tagsArray.length){
            console.log('tag : ', tagsArray[index].name)
            filteredRecipes = recipes.filter(recipe => callbackFilterFn(recipe, tagsArray[index].name))
            index++
            this.recursiveFiltering(tagsArray, index, filteredRecipes, callbackFn)
        }
        return filteredRecipes
    },

    postIngredientsFilteringRecipes : function(){
        const tagsArray = tagsShelf.getTagsFromType('ingredients') 
        if(!tagsArray.length) return this.postSearchFilteringRecipes()
        let index = 0
        let recipes = this.postSearchFilteringRecipes() // starts its filtering process after acquiring post search filter recipes
        console.log('recipes : ', recipes)
        return this.recursiveFiltering(tagsArray, index, recipes, doesRecipeIngredientsContain)      
    },

    postAppliancesFilteringRecipes : function(){
        const tagsArray = tagsShelf.getTagsFromType('appliances')

    },

    postUstensilsFilteringRecipes : function(){
        const tagsArray = tagsShelf.getTagsFromType('ustensils')
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