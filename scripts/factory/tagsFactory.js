const tagsFactory = {

    generateTag({tagName, tagType}) {

        const tagTemplate = `<div class="tag ${tagType}-tag" data-filter-parent="${tagType}">${tagName}</div>`

        return tagTemplate
    }

}

export default tagsFactory