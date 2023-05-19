function RecipesAdapter (recipesArray){
    this.recipes = [...recipesArray]
}

RecipesAdapter.prototype = {
    get appliancesList () {
        // return a set with all the appliances and without any duplicate
        return this.recipes.reduce((accu, recipe) => 
        {
            // for each recipe, the appliance used is added to the set
            accu.add(recipe.appliance.toLowerCase())
            return accu 
        }, new Set()) // using a set so no duplicates
    },

    get ingredientsList () {
        // return a set with all the ingredients and without any duplicate
        return this.recipes.reduce((accu, recipe) => {
            // for each recipe, the ingredient property of all the ingredients objects are added to the set
            (recipe.ingredients).map(ingredientObject => accu.add(ingredientObject?.ingredient.toLowerCase()))
            return accu
        }, new Set())
    },

    get ustensilsList () {
        // return a set with all the ustensils and without any duplicate
        return this.recipes.reduce((accu, recipe) => {
            // for each recipe, the content of the ustensils array is added to the set
            (recipe.ustensils).map(ustensil => accu.add(ustensil.toLowerCase()))
            return accu
        }, new Set())
    },

    get nRecipes (){
        return this.recipes.length
    },

}

export default RecipesAdapter