const recipeFactory = 
{
    generateCard(recipe) {
        const cardTemplate = `
        <article class="recipeCardContainer">
            <div class="recipeImg"></div>
            <div class="recipeDatasContainer">
                <div class="recipeHeadingDurationContainer">
                    <h2 class="recipeHeading">${recipe.name}</h2><span class="recipeDuration">${recipe.time}</span>
                </div>
            </div>
        </article>
        `
        return cardTemplate
    }
}

export default recipeFactory