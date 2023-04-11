import tagsShelf from "../components/tagsShelf.js"
import { normalize, FirstLetterMaj } from "../utils/stringUtils.js"
import recipesGallery from "../components/recipesGallery.js"
import filteringChain from "../utils/filteringChain.js"
import { closeAllOptionsContainers } from "../functional.js"

const tagsFactory = function ({tagName, tagType}) 
{
    const tag = {
        name: tagName,
        type: tagType,

        // tag view which will be injected into the tags shelf
        buildTagView : function(){
            const tagTemplate = `<div class="tag ${this.type}-tag" data-filter-parent="${this.type}">${FirstLetterMaj(this.name)}<img src="./assets/icons/tag-close.png"/></div>`
            const tagNode = new DOMParser().parseFromString(tagTemplate, 'text/html').querySelector('.tag')
            tagNode.addEventListener('click', () => {
                tagsShelf.remove(this.name).renderShelf()
                const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ? yes
                recipesGallery.refresh(filteredRecipes)
                closeAllOptionsContainers()
            })
            return tagNode
        },
    }
    return tag
}

export default tagsFactory