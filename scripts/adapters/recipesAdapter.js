// adapter pattern

function RecipesAdapter (recipesArray){
    this.recipes = [...recipesArray]
}

RecipesAdapter.prototype = {
    get appliancesList () {
        return this.recipes.reduce((accu, recipe) => 
        {
            // condition : if not already in accu, then push it
            accu.add(recipe.appliance.toLowerCase()) // !!! use normalize instead of lowercase
            return accu 
        }, new Set()) // using a set so no duplicates
    },

    get ingredientsList () {
        return this.recipes.reduce((accu, recipe) => {
            // spreading out an ingredients array from a recipe & extracting only the ingredient values out of the subelements (= ignore quantity & unit)
            (recipe.ingredients).flatMap( element => accu.add(element?.ingredient.toLowerCase())) // toLowerCase = get rids of duplicates with different case // !!! use normalize instead of lowercase
            // equivalent : [...recipe.ingredients].forEach( element => accu.add(element?.ingredient)) 
            return accu
        }, new Set())
    },

    get ustensilsList () {
        return this.recipes.reduce((accu, recipe) => {
            // try adding to the set every ustensil in the ustensils array
            recipe.ustensils.forEach(ustensil => accu.add(ustensil.toLowerCase())) // toLowerCase = get rids of duplicates with different case // !!! use normalize instead of lowercase
            return accu
        }, new Set())
    },

    get nRecipes (){
        return this.recipes.length
    },

    get allIngredientsDatas(){

    },

}

export default RecipesAdapter