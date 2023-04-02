import tagsShelf from "../components/tagsShelf.js"
import { normalize, FirstLetterMaj } from "../utils/stringUtils.js"

const Tag = function (tagName, tagType) {

    this.name = tagName
    this.type = tagType
}

Tag.prototype.generateTagView = function (){

    const tagTemplate = `<div class="tag ${this.type}-tag" data-filter-parent="${this.type}">${FirstLetterMaj(this.name)}</div>`
    const tagNode = new DOMParser().parseFromString(tagTemplate, 'text/html').querySelector('.tag')
    tagNode.addEventListener('click', () => tagsShelf.remove(this.name).renderShelf())
    return tagNode
}

export default Tag