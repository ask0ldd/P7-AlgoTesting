import { FirstLetterMaj } from "../utils/stringUtils.js"

const optionsFactory = {
        buildOptionView(option) {
            const optionTemplate = `<div role="button" class="options" data-option-type="${this.type}">${FirstLetterMaj(option)}</div>`
            const optionNode = new DOMParser().parseFromString(optionTemplate, 'text/html').querySelector('.options')
            optionNode.addEventListener('click', () => {
            })
            return optionNode
        },
}

export default optionsFactory