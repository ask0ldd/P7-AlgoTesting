const tagsShelf = {

    tagsContainerNode : document.querySelector(".tagsContainer"),

    tags : new Set(), // no duplicates

    add : function(tag) {
        this.tags.add(tag)
        return this
    },

    remove : function(tagName){

        return this
    },

    renderShelf : function(){
        const shelfView = Array.from(this.tags).reduce((accu,tag) => {
            return accu+tag.generateTagView()
        }, '')
        this.tagsContainerNode.innerHTML = shelfView
    }
}

export default tagsShelf