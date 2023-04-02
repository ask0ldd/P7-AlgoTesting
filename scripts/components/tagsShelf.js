const tagsShelf = {

    tagsContainerNode : document.querySelector(".tagsContainer"),
    tags : new Set(), // switch to an array before release

    alreadyExists : function(tag){
        return JSON.stringify(Array.from(this.tags)).indexOf(JSON.stringify(tag)) === -1 ? false : true
    },

    add : function(tag) {
        if(!this.alreadyExists(tag)) this.tags.add(tag)
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