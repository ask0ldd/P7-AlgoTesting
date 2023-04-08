import { FirstLetterMaj } from "../utils/stringUtils.js"

const Select = function (selector){
    this.nodeElt = document.querySelector(selector)
}

Select.prototype = {
    get node() {
        return this.nodeElt
    },

    optionsUpdate: function(setOfOptions){
        this.node.innerHTML = Array.from(setOfOptions).reduce((accu, option) => accu+`<option value="${option.toLowerCase()}">${FirstLetterMaj(option)}</option>`, '')
    },

    addEventListener(event, fn){
        this.nodeElt.addEventListener(event, fn)
    },

}

export default Select