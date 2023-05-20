function recipesFactory(recipe)
{
    const recipeInstance = {

        recipeDatas : recipe,

        buildCardView : function () {
            // ingredients list which will be injected into the recipe view
            const ingredientsList = (this.recipeDatas?.ingredients).reduce((accu, ingredient, currentIndex) => {
                if(currentIndex > 4 ) return accu // max 6 ingredients displayed on the card
                let ingredientString = ""
                if(ingredient?.quantity) ingredientString += `: ${ingredient?.quantity}`
                if(ingredient?.unit) ingredientString += ` ${ingredient?.unit.split(' ')[0].replace('grammes', 'g')}`
                return (accu + `<li>${ingredient?.ingredient}<span style="font-weight:400;">${ingredientString}</span></li>`)
                // return (accu + `<li>${ingredient?.ingredient}${ingredient?.quantity || ingredient?.unit ? ': ' : ''} ${ingredient?.quantity ? ingredient?.quantity : ''} ${ingredient?.unit ? ingredient?.unit.split(' ')[0].replace('grammes', 'g') : ''}</li>`)
            }, '')

            // recipe view which will be injected into the results gallery
            const cardTemplate = `
                <article class="recipeCardContainer">
                    <ul class="recipePop">${ingredientsList}</ul>
                    <div class="recipeImg"></div>
                    <div class="recipeDatasContainer">
                        <div class="recipeHeadingDurationContainer">
                            <h2 class="recipeHeading">${this.recipeDatas?.name}</h2><span class="recipeDuration"><img class="clock" src="./assets/icons/clock.png"/>${this.recipeDatas?.time || '0'} min</span>
                        </div>
                        <div class="recipeIngredientsDesc">
                            <ul>
                                ${ingredientsList}
                            </ul>
                            <div class="recipeDesc">${this.recipeDatas?.description?.length > 170 ? this.recipeDatas?.description?.substring(0,170) + '...' : this.recipeDatas?.description}</div>
                        </div>
                    </div>
                </article>
            `
            return cardTemplate
        }
    }

    return recipeInstance
}

export default recipesFactory