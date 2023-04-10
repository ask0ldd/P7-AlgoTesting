import recipes from "../../datas/recipes.js";
import RecipesAdapter from "../adapters/recipesAdapter.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { Comparators } from "./comparators.js";

const filteringChain = {
    allRecipes : [...recipes], // no ref, ie duplicate

    next: function(recipe){
        return recipe
    },

    postSearchFilteringRecipes : function(){
        if (searchBar.value.length < 3) return [...this.allRecipes] /* 3 characters mins to be taken into account */
        const filteredRecipes = this.allRecipes.filter(recipe => {
            return Comparators.doesRecipeNameContains(recipe, searchBar.value) || Comparators.doesRecipeDescriptionContains(recipe, searchBar.value) || Comparators.doesRecipeIngredientsContain(recipe, searchBar.value) // passer en arg?
        })
        // filtered recipes => sent to the following filter / autocompletion input => update the displayed options only
        return filteredRecipes
    },

    recursiveFiltering : function (tagsArray, currentRecipes, callbackFilterFn){ // filtering recursively as long as there are tags in the tagsArray clone
        let filteredRecipes = [...currentRecipes]
        let tagsArrayCopy = [...tagsArray]
        if(tagsArray.length>0){
            filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[0].name))
            tagsArrayCopy.shift() // get rid of the first tag cause now processed
            return this.recursiveFiltering(tagsArrayCopy, filteredRecipes, callbackFilterFn) // using return so the last line of the function is executed only at the end of the last iteration
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
        const filteredRecipes = this.recursiveFiltering(activeIngredientsTags, currentRecipes, Comparators.doesRecipeIngredientsContain)
        return filteredRecipes
    },

    postAppliancesFilteringRecipes : function(){
        let currentRecipes = this.postIngredientsFilteringRecipes()
        const activeAppliancesTags = tagsShelf.getTagsFromType('appliances')
        if(activeAppliancesTags.length===0) return currentRecipes
        const filteredRecipes = this.recursiveFiltering(activeAppliancesTags, currentRecipes, Comparators.isRecipeAppliance)
        return filteredRecipes
    },

    postUstensilsFilteringRecipes : function(){
        let currentRecipes = this.postAppliancesFilteringRecipes()
        const activeUstensilsTags = tagsShelf.getTagsFromType('ustensils')
        if(activeUstensilsTags.length===0) return currentRecipes
        const filteredRecipes = this.recursiveFiltering(activeUstensilsTags, currentRecipes, Comparators.doesRecipeUstensilsContain)
        return filteredRecipes
    },

    fullResolution : function(){ // should take recipes as parameters ?!!!
        return new RecipesAdapter(this.postUstensilsFilteringRecipes())
    },

    //move filter index with next()
}

export default filteringChain