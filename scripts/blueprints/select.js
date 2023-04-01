import { FirstLetterMaj } from "../utils/stringUtils.js"

const Select = function (selector){
    this.node = document.querySelector(selector)
}

Select.prototype.optionsUpdate = function(setOfOptions){
    this.node.innerHTML = Array.from(setOfOptions).reduce((accu, option) => accu+`<option value="${option.toLowerCase()}">${FirstLetterMaj(option)}</option>`, '')
}

export default Select