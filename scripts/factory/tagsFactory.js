import Tag from "../blueprints/tag"

const tagsFactory = function ({tagName, tagType}) 
{
    const tag = new Tag(tagName, tagType)
    return tag
}

export default tagsFactory