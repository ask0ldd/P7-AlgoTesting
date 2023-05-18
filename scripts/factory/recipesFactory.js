const recipesFactory = 
{
    buildCardView(recipe) {
        // ingredients list which will be injected into the recipe view
        const ingredientsList = (recipe.ingredients).reduce((accu, ingredient, currentIndex) => {
            if(currentIndex > 4 ) return accu // max 6 ingredients displayed on the card
            return (accu + `<li>${ingredient?.ingredient}${ingredient?.quantity || ingredient?.unit ? ': ' : ''} ${ingredient?.quantity ? ingredient?.quantity : ''} ${ingredient?.unit ? ingredient?.unit.split(' ')[0].replace('grammes', 'g') : ''}</li>`)
        }, '')

        // recipe view which will be injected into the results gallery
        const cardTemplate = `
            <article class="recipeCardContainer">
                <ul class="recipePop">${ingredientsList}</ul>
                <div class="recipeImg"></div>
                <div class="recipeDatasContainer">
                    <div class="recipeHeadingDurationContainer">
                        <h2 class="recipeHeading">${recipe?.name}</h2><span class="recipeDuration"><img class="clock" src="./assets/icons/clock.png"/>${recipe?.time} min</span>
                    </div>
                    <div class="recipeIngredientsDesc">
                        <ul>
                            ${ingredientsList}
                        </ul>
                        <div class="recipeDesc">${recipe?.description?.length > 170 ? recipe?.description?.substring(0,170) + '...' : recipe?.description}</div>
                    </div>
                </div>
            </article>
        `
        return cardTemplate
    }
}

export default recipesFactory