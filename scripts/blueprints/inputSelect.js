const InputSelect = function (inputNode){
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

    /*defineDefaultPlaceholder(placeholder){
        this.outOfFocusPlaceholder = placeholder
        this.setPlaceholder(this.outOfFocusPlaceholder)
        return this.outOfFocusPlaceholder
    },

    defineOnFocusPlaceholder(placeholder){
        this.onFocusPlaceholder = placeholder
        return this.onFocusPlaceholder
    },*/

    definePlaceholder({byDefault, onFocus}){
        this.onFocusPlaceholder = onFocus
        this.outOfFocusPlaceholder = byDefault
    },

    addEventListener(event, fn){
        this.inputNode.addEventListener(event, fn) 
    },

}

export default InputSelect