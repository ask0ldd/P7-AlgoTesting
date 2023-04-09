import optionsFactory from "../factory/optionsFactory.js"

const InputSelect = function (inputNode){ // optionsContainerSelector > tableSelector
    this.inputNode = inputNode
    this.onFocusPlaceholder = ""
    this.outOfFocusPlaceholder = ""
}

InputSelect.prototype = {

    get node(){
        return this.inputNode
    },

    get value(){
        return this.inputNode.value
    },

    set value(value){
        return this.inputNode.value = value
    },

    set placeholder(placeholder){
        return this.inputNode.placeholder = placeholder
    },

    emptyPlaceholder(){
        return this.inputNode.placeholder=""
    },

    setPlaceholder(text){
        return this.inputNode.placeholder = text
    },

    emptyValue(){
        return this.inputNode.value=""
    },

    focus(){
        this.setPlaceholder(this.onFocusPlaceholder)
    },

    defineDefaultPlaceholder(placeholder){
        this.outOfFocusPlaceholder = placeholder
        this.setPlaceholder(this.outOfFocusPlaceholder)
        return this.outOfFocusPlaceholder
    },

    defineOnFocusPlaceholder(placeholder){
        this.onFocusPlaceholder = placeholder
        return this.onFocusPlaceholder
    },

    addEventListener(event, fn){
        this.inputNode.addEventListener(event, fn)
    },

    /*updateOptions(options, optionsType){
        this.nodeOptionsContainer.innerHTML = ""
        options.forEach(option => {
            this.nodeOptionsContainer.appendChild(optionsFactory.buildOptionView(option, optionsType))
        })
        return this
    },

    showOptions(){
        
    },*/
}

export default InputSelect