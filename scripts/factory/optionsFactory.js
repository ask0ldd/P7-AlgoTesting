function optionsFactory(recipe, optionType) {
    const option = {
        type: optionType,
        buildOptionView : function(){
            const optionTemplate = `<div role="button" class="options" data-option-type="${this.type}">${FirstLetterMaj(recipe.appliance)}</div>`
            const optionNode = new DOMParser().parseFromString(optionTemplate, 'text/html').querySelector('.options')
            optionNode.addEventListener('click', () => {
            })
            return optionNode
        },
    }
}

export default optionsFactory