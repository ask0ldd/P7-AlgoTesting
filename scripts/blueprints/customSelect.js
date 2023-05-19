import tagsShelf from "../components/tagsShelf.js"
import optionsFactory from "../factory/optionsFactory.js"
import InputSelect from "./inputSelect.js"

// CustomSelect = input + options list
function CustomSelect({selectContainerNode, selectInputNode, optionsContainerNode}){
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
            // if an option is on the tags shelf, and can't be on the options list anymore
            if(tagsShelf.isAlreadyOnShelf(option)===false) this.optionsContainerNode.appendChild(optionsFactory({option, optionsType}).buildOptionView())
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