const RecipesModel = function (recipes){
    this.recipes = recipes
}

RecipesModel.prototype = {
    get appliances () {
        return this.recipes.reduce((accu, recipe, index, array) => 
        {
            // condition : if not already in accu, then push it
            accu.add(recipe.appliance.toLowerCase())
            return accu 
        }, new Set()) // using a set so no duplicates
    },

    get ingredients () {
        return this.recipes.reduce((accu, recipe) => {
            // spreading an ingredients array of a recipe & extracting only the ingredient values out of the subelements (= ignore quantity & unit)
            (recipe.ingredients).flatMap( element => accu.add(element?.ingredient))
            // equivalent : [...recipe.ingredients].forEach( element => accu.add(element?.ingredient)) 
            return accu
        }, new Set())
    },

    get ustensils () {
        return this.recipes.reduce((accu, recipe) => {
            // try adding to the set every ustensil in the ustensils array
            recipe.ustensils.forEach(ustensil => accu.add(ustensil)) 
            return accu
        }, new Set())
    }
}

export default RecipesModel