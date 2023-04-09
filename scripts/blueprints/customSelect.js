import InputSelect from "./inputSelect.js"

class CustomSelect {
    constructor(selectContainerNode, selectInputNode, optionsContainerNode){
        this.containerNode = selectContainerNode
        this.inputNode = selectInputNode
        this.optionsContainerNode = optionsContainerNode
        this.input = new InputSelect(selectInputNode)
    }
}

CustomSelect.prototype = {
    get containerNode(){
        return this.containerNode
    },

    get inputNode(){
        return this.inputNode
    },

    get optionsContainerNode(){
        return this.optionsContainerNode
    },

    get input(){
        return this.input
    },

}