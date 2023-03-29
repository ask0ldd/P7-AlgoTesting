// titre ingredients description
console.log(recipes)

const ingredientsWithDuplicates = recipes.reduce((accu, recipe) => {
    // reduce extract ingredients arrays
    // map extract ingredients arrays with only the ingredient in it
    // spread operator get rid of ingredients container : array containing only ingredient(s) as elements
    accu.push(...recipe.ingredients.map(ingredient => ingredient.ingredient)) 
    return accu
} , [])

console.log(ingredientsWithDuplicates)

console.log( "reduce : ", recipes.reduce((accu, recipe) => {
    accu.push(recipe.ingredients) 
    return accu
}, []))

/* REDUCE
[[{ingredient: 'Lait de coco', quantity: 400, unit: 'ml'},
{ingredient: 'Jus de citron', quantity: 2},
{ingredient: 'Crème de coco', quantity: 2, unit: 'cuillères à soupe'},
{ingredient: 'Sucre', quantity: 30, unit: 'grammes'},
{ingredient: 'Glaçons'}], ...]
*/

console.log( "spread : ", recipes.reduce((accu, recipe) => {
    accu.push(...recipe.ingredients) 
    return accu
}, []))

/* SPREAD
[{ingredient: 'Lait de coco', quantity: 400, unit: 'ml'},
{ingredient: 'Jus de citron', quantity: 2},
{ingredient: 'Crème de coco', quantity: 2, unit: 'cuillères à soupe'},
{ingredient: 'Sucre', quantity: 30, unit: 'grammes'},
{ingredient: 'Glaçons'}, ...]
*/

console.log( "map : ", recipes.reduce((accu, recipe) => {
    accu.push(...recipe.ingredients.map(ingredient => ingredient.ingredient)) 
    return accu
} , []))

/* MAP
['Lait de coco', 'Jus de citron', 'Crème de coco', ...]
*/


// indexof gives the first index of a value, so we only needs to get rides of values with an index !== indexof
const ingredientsWithoutDuplicates = ingredientsWithDuplicates.filter((ingredient, index) => ingredientsWithDuplicates.indexOf(ingredient) === index)

console.log( "no duplicates : ", ingredientsWithoutDuplicates)




const searchBar = document.querySelector('.mainSearchBar')
searchBar.addEventListener('input', (e) => {
    if(searchBar.value.length>2) console.log('RESULTS : ', getRecipesContaining(searchBar.value))
})

function getRecipesContaining(text){
    return recipes.filter(recipe => {
        // keep recipe if :
        // recipe.name includes text
        // or recipe.description includes text
        // or at least 1 ingredient has not been filtered out
        return isRecipeNameIncluding(recipe, text) || isRecipeDescriptionIncluding(recipe, text) || isAtLeastOneRecipeIngredientIncluding(recipe, text)
    })
}

function isRecipeNameIncluding(recipe, text){
    return recipe.name.toLowerCase().includes(text)
}

function isRecipeDescriptionIncluding(recipe, text){
    return recipe.description.toLowerCase().includes(text)
}

function isAtLeastOneRecipeIngredientIncluding(recipe, text){
    return recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(text)).length > 0
}


//console.log(recipes[0].name.toLowerCase().includes("coca"))