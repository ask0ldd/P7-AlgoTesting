const recipeFactory = 
{
    buildCardView(recipe) {
        const ingredientsList = (recipe.ingredients).reduce((accu, ingredient) => {
            return (accu + `<li>${ingredient?.ingredient}: ${ingredient?.quantity ? ingredient?.quantity : ''} ${ingredient?.unit ? ingredient?.unit.split(' ')[0] : ''}</li>`)
        }, '');

        const cardTemplate = `
        <article class="recipeCardContainer">
            <div class="recipeImg"></div>
            <div class="recipeDatasContainer">
                <div class="recipeHeadingDurationContainer">
                    <h2 class="recipeHeading">${recipe.name}</h2><span class="recipeDuration">${recipe.time}</span>
                </div>
                <div class="recipeIngredientsDesc">
                    <ul>
                        ${ingredientsList}
                    </ul>
                    <div class="recipeDesc">${recipe.description}</div>
                </div>
            </div>
        </article>
        `
        return cardTemplate
    }
}

export default recipeFactory