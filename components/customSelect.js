class CustomSelect extends HTMLElement{
    #shadowDOM
    #masterSelectNode = document.querySelector("#select-ingredients")
    #customSelectOptions
    #customSelectLabel 

    constructor(){
        super()

        this.#shadowDOM = this.attachShadow({ mode: "open" })
        // building the custom select view (style included) passing the master selection options
        const masterOptions = this.#getMasterSelectOptions()
        const view = this.#buildView(masterOptions)
        // view to the ShadowDOM
        this.#shadowDOM.append(view)

        // where the selected option is displayed on the custom select
        this.#customSelectLabel = this.#shadowDOM.querySelector(".customSelectLabel")
        this.#customSelectLabel.addEventListener('click', () => this.#optionsListOpenClose())

        window.addEventListener('keydown', e => this.#keyboardListener(e))

        this.#customSelectOptions = [...this.#shadowDOM.querySelectorAll('.customSelectOption')]

        // click : select custom option / mouse over : highlight custom option
        this.#customSelectOptions.forEach(option => {
            option.addEventListener('click', () => this.#setAsSelected(option))
            option.addEventListener('mouseover', () => this.#setAsHighlighted(option))
        })
    }

    #getMasterSelectOptions(){
        const options = this.#masterSelectNode.querySelectorAll("option")
        const formattedOptions = [...options].map(option => {
            return {
                value : option.value,
                label : option.label,
                selected : option.selected,
                originalElement : option
            }
        })

        return formattedOptions
    }

    get ShadowDOMNode(){
        return this.#shadowDOM
    }

    #buildView(masterSelectOptions){
        const viewContainer = document.createElement("template")
        viewContainer.innerHTML = `
        <link rel="stylesheet" href="../css/customSelect.css"/>
        <div class="customSelectContainer">
            <span role="button" aria-haspopup=”listbox” aria-expanded="false" class="customSelectLabel">Ingrédients<img class="customSelectArrow" src="./assets/icons/select-arrow.svg"/></span>
            <ul class="customSelectOptionsContainer" role=”listbox” aria-activedescendant>`+
            masterSelectOptions.reduce((accu, option) => 
            accu + `<li 
            data-value="${option.value}"
            class="customSelectOption ${ option.selected === true ? 'selectedOption' : ''  }">
            ${option.label}</li>`, '')
            +`</ul>
        </div>
        `

        // return the content of the view container (template)
        return viewContainer.content.cloneNode(true)
    }

    #keyboardListener(e) // ACCESSIBILITY : keyboard navigation
    {
        if(e.code == "Escape") return 
        if(e.code == "ArrowUp") return 
        if(e.code == "ArrowDown") return 
    }

    #previousOption(){}

    #nextOption(){}

    #optionsListOpenClose(){
        const optionsContainer = this.#shadowDOM.querySelector(".customSelectOptionsContainer")
        const arrow = this.#shadowDOM.querySelector(".customSelectArrow")
        if(optionsContainer.style.display === "none" || optionsContainer.style.display === "") { 
            optionsContainer.style.display = 'flex'
            arrow.style.transform = "rotate(0deg)"
            this.#customSelectLabel.setAttribute("aria-expanded", true)
        }
        else{ 
            optionsContainer.style.display = 'none'
            arrow.style.transform = "rotate(180deg)"
            this.#customSelectLabel.setAttribute("aria-expanded", false)
        }                  
    }

    // sets a custom option as selected
    #setAsSelected(customOption){
        this.#customSelectOptions.forEach(option => {
            option.classList.remove("selectedOption")
            option.setAttribute("aria-selected", false)
        })
        this.#masterSelectNode.value = customOption.getAttribute("data-value")
        customOption.classList.add("selectedOption")
        customOption.setAttribute("aria-selected", true)
    }

    // hightlighting a custom option
    #setAsHighlighted(customOption){
        this.#customSelectOptions.forEach(option => {
            option.classList.remove("highlightedOption")
        })
        customOption.classList.add("highlightedOption")
    }

    #getSelectedCustomOption(){
        return document.querySelector('.selectedOption')
    }

    #getHighlightedCustomOption(){
        return document.querySelector('.highlightedOption')
    }
}

customElements.define("custom-select", CustomSelect)