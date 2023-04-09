import optionsFactory from "../factory/optionsFactory.js"
import InputSelect from "./inputSelect.js"

const CustomSelect = function (selectContainerNode, selectInputNode, optionsContainerNode){
    this._containerNode = selectContainerNode
    this._inputNode = selectInputNode
    this._optionsContainerNode = optionsContainerNode
    this._input = new InputSelect(selectInputNode)
}


CustomSelect.prototype = {
    get container_Node(){
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
            this.optionsContainerNode.appendChild(optionsFactory.buildOptionView(option, optionsType))
        })
        return this
    },

    reset(){
        this.input.emptyValue()
        this.input.setPlaceholder(this.input.outOfFocusPlaceholder)
        this.optionsContainerNode.innerHTML = ""
        return this.input.placeholder
    },

}

export default CustomSelect