import recipes from "../../datas/recipes.js";
import RecipesList from "../blueprints/recipesList.js";
import tagsShelf from "../components/tagsShelf.js";
import searchBar from "../components/searchBar.js";

const filteringChain = {
    unalteredRecipes : [...recipes], // no ref, ie duplicate
    recipes_PostSearchFilter : [...recipes],
    recipes_PostIngredientsFilter : [...recipes],
    recipes_PostAppliancesFilter : [...recipes],
    recipes_PostUstensilsFilter : [...recipes],
   
    searchFiltering : function(){
        let recipes = [...this.unalteredRecipes]
        return recipes.filter(recipe => {
            return doesRecipeNameContains(recipe, searchBar.node.value) || doesRecipeDescriptionContains(recipe, searchBar.node.value) || doesRecipeIngredientsContain(recipe, searchBar.node.value) // passer en arg?
        })
    },

    ingredientsFiltering : function(){
        const tagsArray = tagsShelf.getTagsFromType('ingredients') 
        if(!tagsArray.length) return [...this.recipes_PostSearchFilter]
        let index = 0
        let recipes = [...this.recipes_PostSearchFilter]
        recursiveFiltering() // recursivité car filtrage du resultat du resultat, etc... tamisage successif
        {
            if(index<tagsArray.length){
                const filteredRecipes = recipes.filter(recipe => doesRecipeIngredientsContain(recipe, tagsArray[index]))
                recipes = [...filteredRecipes]
                index++
                recursiveFiltering()
            }
        }
        console.log([...recipes])
        return [...recipes]
        
    },

    appliancesFiltering : function(){
        const tagsArray = tagsShelf.getTagsFromType('appliances')

    },

    ustensilsFiltering : function(){
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