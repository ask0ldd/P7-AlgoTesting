import { normalize } from "../services/stringUtils.js"
import { Comparators } from "../services/comparators.js"

function SearchBar (selector){
    this.nodeElt = document.querySelector(selector)
}

SearchBar.prototype = {
    get node() {
        return this.nodeElt
    },

    get value(){
        return normalize(this.nodeElt.value)
    },
    
    addEventListener(event, fn){
        this.nodeElt.addEventListener(event, fn)
    },

}

// For testing purposes only
SearchBar.prototype.filtering = function(recipes, filteringArgument){
    return recipes.filter(recipe => {
        return Comparators.doesRecipeNameContains(recipe, filteringArgument) || Comparators.doesRecipeDescriptionContains(recipe, filteringArgument) || Comparators.doesRecipeIngredientsContain(recipe, filteringArgument)
    })
}

SearchBar.prototype.isEmpty = function(){
    return (normalize(this.nodeElt.value) === "")
}

// End / For testing purposes

const searchBar = new SearchBar('.mainSearchBar')

export default searchBar