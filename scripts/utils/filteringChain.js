import recipes from "../../datas/recipes.js";
import RecipesList from "../blueprints/recipesList.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { normalize } from "./stringUtils.js";

const filteringChain = {
    allRecipes : [...recipes], // no ref, ie duplicate

    postSearchFilteringRecipes : function(){
        let currentRecipes = [...this.allRecipes]
        if (searchBar.isEmpty === true) return currentRecipes
        const filteredRecipes = currentRecipes.filter(recipe => {
            return doesRecipeNameContains(recipe, searchBar.node.value) || doesRecipeDescriptionContains(recipe, searchBar.node.value) || doesRecipeIngredientsContain(recipe, searchBar.node.value) // passer en arg?
        })
        return filteredRecipes
    },

    recursiveFiltering : function (tagsArray, index, currentRecipes, callbackFilterFn){ // multiple tags = successive filterings
        let filteredRecipes = [...currentRecipes]
        if(index<tagsArray.length){
            console.log('tag : ', tagsArray[index].name)
            filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[index].name))
            this.recursiveFiltering(tagsArray, index+1, filteredRecipes, callbackFilterFn)
        }
        return filteredRecipes
    },

    /*recursiveFiltering : function (tagsArray, index, recipes, callbackFilterFn){ // multiple tags = successive filterings
        // let filteredRecipes = [...recipes]
        console.log('recipes evol : ', [...recipes])
        console.log('index : ', index)
        console.log('length : ', tagsArray.length)
        if(index===tagsArray.length) return [...recipes]

        // console.log('recipes evol : ', filteredRecipes)
        // console.log('tag : ', tagsArray[index].name)
        let filteredRecipes = recipes.filter(recipe => callbackFilterFn(recipe, tagsArray[index].name))
        this.recursiveFiltering(tagsArray, index+1, filteredRecipes, callbackFilterFn)
    },*/

    postIngredientsFilteringRecipes : function(){
        // get datas filtered through searchbar
        let currentRecipes = this.postSearchFilteringRecipes()
        const tagsArray = tagsShelf.getTagsFromType('ingredients')
        if(tagsArray.length===0) return currentRecipes
        let index = 0
        const filteredRecipes = this.recursiveFiltering(tagsArray, index, currentRecipes, doesRecipeIngredientsContain)
        return filteredRecipes
    },

    postAppliancesFilteringRecipes : function(){
        const tagsArray = tagsShelf.getTagsFromType('appliances')
        if(!tagsArray.length || tagsArray.length<1) return this.postIngredientsFilteringRecipes()

    },

    postUstensilsFilteringRecipes : function(){
        const tagsArray = tagsShelf.getTagsFromType('ustensils')
        if(!tagsArray.length || tagsArray.length<1) return this.postAppliancesFilteringRecipes()
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