import { normalize, FirstLetterMaj } from "../utils/stringUtils.js"
import { doesRecipeNameContains, doesRecipeDescriptionContains, doesRecipeIngredientsContain } from "../utils/comparators.js"

const SearchBar = function (selector){
    this.nodeElt = document.querySelector(selector)
}

SearchBar.prototype = {
    get node() {
        return this.nodeElt
    },

    get value(){
        return normalize(this.nodeElt.value)
    },
}

SearchBar.prototype.filtering = function(recipes, filteringArgument){
    return recipes.filter(recipe => {
        return doesRecipeNameContains(recipe, filteringArgument) || doesRecipeDescriptionContains(recipe, filteringArgument) || doesRecipeIngredientsContain(recipe, filteringArgument)
    })
}

SearchBar.prototype.isEmpty = function(){
    return (normalize(this.nodeElt.value) === "")
}

SearchBar.prototype.listenForInput = function(){

}

const searchBar = new SearchBar('.mainSearchBar')

export default searchBar