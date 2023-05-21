import { FirstLetterMaj } from "../services/stringUtils.js"
import tagsShelf from "../components/tagsShelf.js"
import filteringChain from "../services/filteringChain.js"
import recipesGallery from "../components/recipesGallery.js"
import tagsFactory from "./tagsFactory.js"
import searchBar from "../components/searchBar.js"

function optionsFactory({option, optionsType}) {
    
    const optionInstance = {

        option : option,
        optionsType : optionsType,

        // build an option buttons which will generate a tag on click
        buildOptionView() {
            const optionTemplate = `<div role="button" tabindex="0" class="options" data-option-type="${this.optionsType}">${FirstLetterMaj(this.option)}</div>`
            const optionNode = new DOMParser().parseFromString(optionTemplate, 'text/html').querySelector('.options')
            // mousedown instead of click cause click can't register before focusout
            optionNode.addEventListener('click', (e) => { 
                e.preventDefault()
                // add a tag to the shelf and update the shelf
                tagsShelf.add(tagsFactory({tagName : this.option, tagType : this.optionsType})).renderShelf()
                const filteredRecipes = filteringChain.fullResolution()
                recipesGallery.refresh(filteredRecipes)
                searchBar.node.focus()
            })
            return optionNode
        },
    }

    return optionInstance
}

export default optionsFactory