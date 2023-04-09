import { FirstLetterMaj } from "../utils/stringUtils.js"
import tagsShelf from "../components/tagsShelf.js"
import filteringChain from "../utils/filteringChain.js"
import recipesGallery from "../components/recipesGallery.js"
import tagsFactory from "./tagsFactory.js"

const optionsFactory = {
        buildOptionView(option, optionType) {
            const optionTemplate = `<div role="button" tabindex="0" class="options" data-option-type="${optionType}">${FirstLetterMaj(option)}</div>`
            const optionNode = new DOMParser().parseFromString(optionTemplate, 'text/html').querySelector('.options')
            optionNode.addEventListener('mousedown', (e) => { // mousedown instead of click cause click can't register before focusout
                // recuperer tagtype en analysant le data type du parent ???
                tagsShelf.add(tagsFactory({tagName : option, tagType : optionType})).renderShelf() // add a tag to the shelf and update the shelf
                const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ?
                recipesGallery.refresh(filteredRecipes)
            })
            return optionNode
        },
}

export default optionsFactory