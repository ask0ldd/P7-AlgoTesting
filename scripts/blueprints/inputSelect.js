import optionsFactory from "../factory/optionsFactory.js"

const InputSelect = function (inputSelector, selectSelector, optionsContainerSelector, onFocusPlaceholder, outOfFocusPlaceholder){ // optionsContainerSelector > tableSelector
    this.inputNode = document.querySelector(inputSelector)
    this.nodeRelatedSelect = document.querySelector(selectSelector)
    this.nodeOptionsContainer = document.querySelector(optionsContainerSelector)
    this.onFocusPlaceholder = onFocusPlaceholder || ""
    this.outOfFocusPlaceholder = outOfFocusPlaceholder || ""
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

    reset(){
        this.emptyValue()
        this.setPlaceholder(this.outOfFocusPlaceholder)
        return this.inputNode.placeholder
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

    updateOptions(recipes){
        console.log("ohoho")
        this.nodeOptionsContainer.innerHTML = ""
        recipes.recipes.forEach(recipe => {
            this.nodeOptionsContainer.appendChild(optionsFactory.buildOptionView(recipe))
            console.log(optionsFactory.buildOptionView(recipe))
        })
        return this
    },

    showOptions(){
        
    },
}

export default InputSelect