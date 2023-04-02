const tagsShelf = {

    tagsContainerNode : document.querySelector(".tagsContainer"),
    tags : new Set(), // switch to an array before release

    isAlreadyOnShelf : function(tag){
        return JSON.stringify(Array.from(this.tags)).indexOf(JSON.stringify(tag)) === -1 ? false : true
    },

    add : function(tag) {
        if(!this.isAlreadyOnShelf(tag)) this.tags.add(tag)
        return this
    },

    remove : function(tagName){
        console.log("remove")
        this.tags.forEach(tag => {
            if(tag.name === tagName) this.tags.delete(tag)
        })
        return this
    },

    renderShelf : function(){
        this.tagsContainerNode.innerHTML = ""
        Array.from(this.tags).map(tag => this.tagsContainerNode.appendChild(tag.generateTagView()))
    }
}

export default tagsShelf