import recipesFactory from "../factory/recipesFactory.js"

const recipesGallery = {
    node : document.querySelector('.searchResults'),

    refresh : function(RecipesAdapter) {
        this.node.innerHTML = `<div style="position : absolute; top:2rem; left:2rem; width:100%; height:3rem;">${RecipesAdapter.list.length} results</div>` + RecipesAdapter.list.reduce((accu, recipe) => accu + recipesFactory.buildCardView(recipe), '')
    }
}

export default recipesGallery