import filteringChain from "../utils/filteringChain.js"
import { doesRecipeNameContains, doesRecipeUstensilsContain } from "../utils/comparators.js"
import { normalize } from "../utils/stringUtils.js"
import RecipesAdapter from "../adapters/recipesAdapter.js"
import {appliancesSelect, ustensilsSelect, ingredientsSelect} from "../functional.js"

const InputSelect = function (inputSelector, selectSelector){
    this.nodeElt = document.querySelector(inputSelector)
    this.nodeRelatedSelect = document.querySelector(selectSelector)
}

InputSelect.prototype = {

    get node(){
        return this.nodeElt
    }

    /*onInput(callback){
        this.nodeElt.addEventListener("input", callback)
    },*/
    // when typing some words in a select input, the filtering is not done on a partial result of the filtering chain but on the fullresolution result
    // get full resolution results
    // search for the typed word in the right part of the table compising each recipe
    // update the select

    // full resolution = recipes > filtering with input content > result => update related Select
    // efface les mots, reupdate without filtering with input conte
}

export default InputSelect