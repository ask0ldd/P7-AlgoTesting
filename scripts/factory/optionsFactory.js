import { FirstLetterMaj } from "../services/stringUtils.js"
import tagsShelf from "../components/tagsShelf.js"
import filteringChain from "../services/filteringChain.js"
import recipesGallery from "../components/recipesGallery.js"
import tagsFactory from "./tagsFactory.js"

const optionsFactory = {

        // build an option buttons which will generate a tag on click
        buildOptionView(option, optionType) {
            const optionTemplate = `<div role="button" tabindex="0" class="options" data-option-type="${optionType}">${FirstLetterMaj(option)}</div>`
            const optionNode = new DOMParser().parseFromString(optionTemplate, 'text/html').querySelector('.options')
            optionNode.addEventListener('mousedown', (e) => { // mousedown instead of click cause click can't register before focusout
                tagsShelf.add(tagsFactory({tagName : option, tagType : optionType})).renderShelf() // add a tag to the shelf and update the shelf
                const filteredRecipes = filteringChain.fullResolution()
                recipesGallery.refresh(filteredRecipes)
            })
            return optionNode
        },
}

export default optionsFactory