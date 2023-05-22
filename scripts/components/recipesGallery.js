import recipesFactory from "../factory/recipesFactory.js"

const noResultsResponse = `« Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`

const recipesGallery = {
    node : document.querySelector('.searchResults'),

    // takes all the valid recipes and passed those to the recipes factory, 
    // then build the view via the .buildCardView() method associated to each recipe
    refresh : function(RecipesAdapter) {
        if(RecipesAdapter.nRecipes < 1) return this.node.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; font-family:lato; color:#000; width:100%; grid-column: 1 / 4; height:10rem">${noResultsResponse}</div>`
        this.node.innerHTML = `<div style="font-family:lato; position : absolute; top:2rem; left:93%; width:fit-content; height:3rem;">${RecipesAdapter.nRecipes} resultats</div>` 
        + RecipesAdapter.recipes.reduce((accu, recipe) => {
            if(!recipe?.ingredients || !recipe?.name || !recipe?.description) return accu
            return accu + recipesFactory(recipe)?.buildCardView()
        }, '')
    }
}

export default recipesGallery