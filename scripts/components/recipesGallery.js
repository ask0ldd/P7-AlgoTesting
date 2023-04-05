import recipesFactory from "../factory/recipesFactory.js"

const recipesGallery = {
    node : document.querySelector('.searchResults'),

    refresh : function(recipesList) {
        this.node.innerHTML = recipesList.list.reduce((accu, recipe) => accu + recipesFactory.buildCardView(recipe), '')
    }
}

export default recipesGallery