import recipesFactory from "../factory/recipesFactory.js"

const recipesGallery = {
    node : document.querySelector('.searchResults'),

    refresh : function(RecipesAdapter) {
        this.node.innerHTML = `<div style="font-family:lato; position : absolute; top:2rem; left:93%; width:100%; height:3rem;">${RecipesAdapter.nRecipes} resultats</div>` + RecipesAdapter.recipes.reduce((accu, recipe) => accu + recipesFactory.buildCardView(recipe), '')
    }
}

export default recipesGallery