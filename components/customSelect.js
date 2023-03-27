class CustomSelect extends HTMLElement{
    #shadowDOM

    constructor(){
        super()
        // create a shadowDOM
        this.#shadowDOM = this.attachShadow({ mode: "open" })
        const view = this.#getView()
        // duplicate the inner content of the view : inside <template></template>
        // and append it to the shadowDOM
        this.#shadowDOM.append(view)
        console.log(this.#shadowDOM)

        this.#shadowDOM.querySelector(".customSelectContainer").addEventListener('click', () => {
            const optionsContainer = this.#shadowDOM.querySelector(".customSelectOptionsContainer")
            const selectLabel = this.#shadowDOM.querySelector(".customSelectLabel")
            const arrow = this.#shadowDOM.querySelector(".customSelectArrow")
            if(optionsContainer.style.display === "none" || optionsContainer.style.display === "") { 
                optionsContainer.style.display='flex'
                arrow.style.transform="rotate(0deg)"
            }
            else{ 
                optionsContainer.style.display='none'
                arrow.style.transform="rotate(180deg)"
            }            
        })
    }

    setView(){

    }

    #getView(){
        const viewContainer = document.createElement("template")
        viewContainer.innerHTML=`
        <link rel="stylesheet" href="../css/customSelect.css">
        <div class="customSelectContainer">
            <span class="customSelectLabel">Ingrédients<img class="customSelectArrow" src="./assets/icons/select-arrow.svg"></span>
            <ul class="customSelectOptionsContainer">
                <li class="customSelectOption">Option 1</li>
                <li class="customSelectOption">Option 2</li>
                <li class="customSelectOption">Option 3</li>
            </ul>
        </div>
        `
        return viewContainer.content.cloneNode(true)
    }
}

customElements.define("custom-select", CustomSelect)

/*function getSelectView(options){
    const view = `
    <div class="customSelectContainer">
        <span class="customSelectLabel">Ingrédients</span>
        <ul class="customSelectOptionsContainer">
            <li class="customSelectOption">Option 1</li>
            <li class="customSelectOption">Option 2</li>
            <li class="customSelectOption">Option 3</li>
        </ul>
    </div>
    `
    return view
}*/



/*document.querySelector(".customSelectContainer").addEventListener('click', () => {
    const optionsContainer = document.querySelector(".customSelectOptionsContainer")
    const selectLabel = document.querySelector(".customSelectLabel")
    const arrow = document.querySelector(".customSelectArrow")
    if(optionsContainer.style.display === "none" || optionsContainer.style.display === "") { 
        optionsContainer.style.display='flex'
        arrow.style.transform="rotate(0deg)"
    }
    else{ 
        optionsContainer.style.display='none'
        arrow.style.transform="rotate(180deg)"
    }
}
)*/