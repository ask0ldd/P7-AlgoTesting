/*import filteringChain from "../utils/filteringChain.js"
import { doesRecipeNameContains, doesRecipeUstensilsContain } from "../utils/comparators.js"
import { normalize } from "../utils/stringUtils.js"
import RecipesAdapter from "../adapters/recipesAdapter.js"
import {appliancesSelect, ustensilsSelect, ingredientsSelect} from "../functional.js"*/

const InputSelect = function (inputSelector, selectSelector, optionsContainerSelector, onFocusPlaceholder, outOfFocusPlaceholder){ // selectSelector > tableSelector
    this.nodeElt = document.querySelector(inputSelector)
    this.nodeRelatedSelect = document.querySelector(selectSelector)
    this.nodeOptionsContainer = document.querySelector(optionsContainerSelector)
    this.onFocusPlaceholder = onFocusPlaceholder | ""
    this.outOfFocusPlaceholder = outOfFocusPlaceholder | ""
}

InputSelect.prototype = {

    get node(){
        return this.nodeElt
    },

    get value(){
        return this.nodeElt.value
    },

    set value(value){
        return this.nodeElt.value = value
    },

    set placeholder(placeholder){
        return this.nodeElt.placeholder = placeholder
    },

    emptyPlaceholder(){
        return this.nodeElt.placeholder=""
    },

    setPlaceholder(text){
        return this.nodeElt.placeholder = text
    },

    emptyValue(){
        return this.nodeElt.value=""
    },

    reset(){
        this.emptyValue()
        this.setPlaceholder(this.outOfFocusPlaceholder)
        return this.nodeElt.placeholder
    },

    setDefaultPlaceholder(placeholder){
        this.outOfFocusPlaceholder = placeholder
        this.setPlaceholder(this.outOfFocusPlaceholder)
        return this.outOfFocusPlaceholder
    },

    setOnFocusPlaceholder(placeholder){
        this.onFocusPlaceholder = placeholder
        return this.onFocusPlaceholder
    },
}

export default InputSelect