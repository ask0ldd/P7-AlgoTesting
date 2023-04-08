import { normalize, FirstLetterMaj } from "../utils/stringUtils.js"
import { Comparators } from "../utils/comparators.js"

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
        return Comparators.doesRecipeNameContains(recipe, filteringArgument) || Comparators.doesRecipeDescriptionContains(recipe, filteringArgument) || Comparators.doesRecipeIngredientsContain(recipe, filteringArgument)
    })
}

SearchBar.prototype.isEmpty = function(){
    return (normalize(this.nodeElt.value) === "")
}

SearchBar.prototype.listenForInput = function(){

}

const searchBar = new SearchBar('.mainSearchBar')

export default searchBar