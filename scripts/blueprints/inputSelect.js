function InputSelect(inputNode){
    this.inputNode = inputNode
    this.onFocusPlaceholder = ""
    this.outOfFocusPlaceholder = ""
}

// input used to filter the options available in a select

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
        this.inputNode.focus()
    },

    definePlaceholder({byDefault, onFocus}){
        this.onFocusPlaceholder = onFocus
        this.outOfFocusPlaceholder = byDefault
    },

    addEventListener(event, fn){
        this.inputNode.addEventListener(event, fn) 
    },

}

export default InputSelect