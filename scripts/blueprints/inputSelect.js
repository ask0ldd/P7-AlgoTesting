/*import filteringChain from "../utils/filteringChain.js"
import { doesRecipeNameContains, doesRecipeUstensilsContain } from "../utils/comparators.js"
import { normalize } from "../utils/stringUtils.js"
import RecipesAdapter from "../adapters/recipesAdapter.js"
import {appliancesSelect, ustensilsSelect, ingredientsSelect} from "../functional.js"*/

const InputSelect = function (inputSelector, selectSelector){
    this.nodeElt = document.querySelector(inputSelector)
    this.nodeRelatedSelect = document.querySelector(selectSelector)
}

InputSelect.prototype = {

    get node(){
        return this.nodeElt
    },

    get value(){
        return this.nodeElt.value
    }

}

export default InputSelect