const tagsShelf = {

    tagsContainerNode : document.querySelector(".tagsContainer"),

    tags : new Set(), // no duplicates

    add : function(tag) {
        tag.add(tag)
    },

    remove : function(tagName){

    },

    renderShelf : function(){
        Array.from(tags).reduce((accu,tag) => {
            return accu+tag.generateTagView()
        }, '')
    }
}