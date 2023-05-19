function RecipesAdapter (recipesArray){
    this.recipes = [...recipesArray]
}

RecipesAdapter.prototype = {
    get appliancesList () {
        // for each recipe
        return this.recipes.reduce((accu, recipe) => 
        {
            accu.add(recipe.appliance.toLowerCase())
            return accu 
        }, new Set()) // using a set so no duplicates
    },

    get ingredientsList () {
        // for each recipe
        return this.recipes.reduce((accu, recipe) => {
            // extracting only the ingredient out of the ingredient object (=> ignore quantity & unit)
            // flatmap
            (recipe.ingredients).map( ingredientArray => accu.add(ingredientArray?.ingredient.toLowerCase()))
            return accu
        }, new Set())
    },

    get ustensilsList () {
        // for each recipe
        return this.recipes.reduce((accu, recipe) => {
            // adding to the set every ustensil in the ustensils array
            (recipe.ustensils).map(ustensil => accu.add(ustensil.toLowerCase()))
            return accu
        }, new Set())
    },

    get nRecipes (){
        return this.recipes.length
    },

}

export default RecipesAdapter