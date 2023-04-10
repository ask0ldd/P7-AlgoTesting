import tagsShelf from "../components/tagsShelf.js"
import optionsFactory from "../factory/optionsFactory.js"
import InputSelect from "./inputSelect.js"
import { normalize } from "../utils/stringUtils.js"

const CustomSelect = function ({selectContainerNode, selectInputNode, optionsContainerNode}){
    this._containerNode = selectContainerNode
    this._inputNode = selectInputNode
    this._optionsContainerNode = optionsContainerNode
    this._input = new InputSelect(selectInputNode)
}


CustomSelect.prototype = {
    get containerNode(){
        return this._containerNode
    },

    get inputNode(){
        return this._inputNode
    },

    get optionsContainerNode(){
        return this._optionsContainerNode
    },

    get input(){
        return this._input
    },

    updateOptions(options, optionsType){
        this.optionsContainerNode.innerHTML = ""
        options.forEach(option => {
            // add to options only if corresponding tag not already on shelf
            if(tagsShelf.isAlreadyOnShelf(option)===false) this.optionsContainerNode.appendChild(optionsFactory.buildOptionView(option, optionsType))
        })
        return this
    },

    reset(){
        this.input.emptyValue()
        this.input.setPlaceholder(this.input.outOfFocusPlaceholder)
        this.optionsContainerNode.innerHTML = ""
        return this.input.placeholder
    },

    hideOptionsContainer(){
        this.optionsContainerNode.style.display = "none"
    },

    displayOptionsContainer(){
        this.optionsContainerNode.style.display = "grid"
    },

}

export default CustomSelect