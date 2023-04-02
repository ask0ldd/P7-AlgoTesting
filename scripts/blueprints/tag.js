const Tag = function (tagName, tagType) {

    this.name = tagName
    this.type = tagType
}

Tag.prototype.generateTagView = function (){

    const tagTemplate = `<div class="tag ${this.type}-tag" data-filter-parent="${this.type}">${this.name}</div>`
    return tagTemplate
}

export default Tag