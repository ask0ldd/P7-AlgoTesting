import tagsShelf from "../components/tagsShelf.js"
import { normalize, FirstLetterMaj } from "../utils/stringUtils.js"
import recipesGallery from "../components/recipesGallery.js"
import filteringChain from "../utils/filteringChain.js"
import RecipesList from "../blueprints/recipesList.js"

const tagsFactory = function ({tagName, tagType}) 
{
    const tag = {
        name: tagName,
        type: tagType,
        buildTagView : function(){
            const tagTemplate = `<div class="tag ${this.type}-tag" data-filter-parent="${this.type}">${FirstLetterMaj(this.name)}</div>`
            const tagNode = new DOMParser().parseFromString(tagTemplate, 'text/html').querySelector('.tag')
            tagNode.addEventListener('click', () => {
                tagsShelf.remove(this.name).renderShelf()
                const filteredRecipes = filteringChain.fullResolution() // !! should i pass the recipes as parameters ? yes
                recipesGallery.refresh(filteredRecipes)
            })
            return tagNode
        },
    }
    return tag
}

export default tagsFactory