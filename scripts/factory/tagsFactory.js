import tagsShelf from "../components/tagsShelf.js"
import { FirstLetterMaj } from "../services/stringUtils.js"
import recipesGallery from "../components/recipesGallery.js"
import filteringChain from "../services/filteringChain.js"
import { closeAllOptionsContainers } from "../index.js"

function tagsFactory ({tagName, tagType}) 
{
    const tag = {
        name: tagName,
        type: tagType,

        // tag view which will be appended to the tags shelf
        buildTagView : function(){
            const tagTemplate = `<div class="tag ${this.type}-tag" data-filter-parent="${this.type}">${FirstLetterMaj(this.name)}<img src="./assets/icons/tag-close.png"/></div>`
            const tagNode = new DOMParser().parseFromString(tagTemplate, 'text/html').querySelector('.tag')
            tagNode.addEventListener('click', () => {
                tagsShelf.remove(this.name).renderShelf()
                const filteredRecipes = filteringChain.fullResolution()
                recipesGallery.refresh(filteredRecipes)
                closeAllOptionsContainers()
            })
            return tagNode
        },
    }
    return tag
}

export default tagsFactory