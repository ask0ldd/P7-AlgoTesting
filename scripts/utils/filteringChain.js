import recipes from "../../datas/recipes.js";
import RecipesAdapter from "../adapters/recipesAdapter.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";
import { Comparators } from "./comparators.js";
import { normalize } from "./stringUtils.js";

const filteringChain = {
    allRecipes : [...recipes],

    next: function(recipe){
        return recipe
    },

    postSearchFilteringRecipes : function(){
        if (searchBar.value.length < 3) return [...this.allRecipes] // 3 characters mins to trigger the filtering chain
        const filteredRecipes = this.allRecipes.filter(recipe => {
            return Comparators.doesRecipeNameContains(recipe, searchBar.value) || Comparators.doesRecipeDescriptionContains(recipe, searchBar.value) || Comparators.doesRecipeIngredientsContain(recipe, searchBar.value) // passer en arg?
        })
        return filteredRecipes
    },

    postSearchFiltering_Procedural : function(){
        if (searchBar.value.length < 3) return [...this.allRecipes]
        const input = normalize(searchBar.value)
        const allRecipesClone = [...this.allRecipes]
        let validRecipes = []
        for(let index = 0; index < allRecipesClone?.length; index++){
            // if recipe.name | recipe.description | recipe.ingredients.ingredient includes the keywords, 
            // the recipe is pushed into a results array & the loop jump to the next iteration
            if (normalize(allRecipesClone[index]?.name).includes(input)) {validRecipes.push(allRecipesClone[index]); continue;}
            if (normalize(allRecipesClone[index]?.description).includes(input)) {validRecipes.push(allRecipesClone[index]); continue;}
            for(let index2 = 0; index2 < allRecipesClone[index].ingredients?.length; index2++){
                if(normalize(allRecipesClone[index]?.ingredients[index2]?.ingredient).includes(input)) {validRecipes.push(allRecipesClone[index]); break;}
            }
        }
        return validRecipes
    },

    recursiveFiltering : function (tagsArray, currentRecipes, callbackFilterFn){ // filtering as long as all tags in the tagsArray clone are not processed
        let filteredRecipes = [...currentRecipes]
        let tagsArrayCopy = [...tagsArray]
        if(tagsArray.length>0){
            filteredRecipes = currentRecipes.filter(recipe => callbackFilterFn(recipe, tagsArray[0].name))
            tagsArrayCopy.shift() // get rid of the first tag since now processed
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
        // use datas filtered through searchbar
        // let currentRecipes = this.postSearchFilteringRecipes()
        let currentRecipes = this.postSearchFiltering_Procedural()
        const activeIngredientsTags = tagsShelf.getTagsFromType('ingredients')
        if(activeIngredientsTags.length===0) return currentRecipes
        // passing to the recursive fn : all ingredients tags on the shelf, all recipes who got through previous filtering steps, a function to use as a filter
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