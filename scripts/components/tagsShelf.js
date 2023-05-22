const tagsShelf = {

    tagsContainerNode : document.querySelector(".tagsContainer"),
    tags : new Set(),
    maxTags : 6,

    isAlreadyOnShelf : function(tag){
        return JSON.stringify(Array.from(this.tags)).indexOf(JSON.stringify(tag)) === -1 ? false : true
    },

    add : function(tag) {
        if(this.tags.size >= this.maxTags) return this
        if(!this.isAlreadyOnShelf(tag)) this.tags.add(tag)
        return this
    },

    remove : function(tagName){
        this.tags.forEach(tag => {
            if(tag.name === tagName) this.tags.delete(tag)
        })
        return this
    },

    renderShelf : function(){
        this.tagsContainerNode.innerHTML = ""
        Array.from(this.tags).map(tag => this.tagsContainerNode.appendChild(tag.buildTagView()))
    },

    getTagsFromType : function(type){
        return Array.from(this.tags).filter(array => array.type === type)
    },

}

export default tagsShelf