import recipesFactory from "../factory/recipesFactory.js"

const recipesGallery = {
    node : document.querySelector('.searchResults'),

    refresh : function(RecipesAdapter) {
        this.node.innerHTML = `<div style="font-family:lato; position : absolute; top:2rem; left:93%; width:100%; height:3rem;">${RecipesAdapter.nRecipes} resultats</div>` 
        + RecipesAdapter.recipes.reduce((accu, recipe) => {
            if(!recipe?.ingredients || !recipe?.name || !recipe?.description) return accu
            return accu + recipesFactory(recipe)?.buildCardView()
        }, '')
    }
}

export default recipesGallery