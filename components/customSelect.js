class CustomSelect extends HTMLElement{
    #shadowDOM
    #selectValue
    #selectReference = document.querySelector("#select-ingredients")
    #selectReferenceSelector = "#select-ingredients"
    #customOptions

    constructor(){
        super()

        this.#selectValue = document.querySelector("#select-ingredients").value
        // create a shadowDOM and append the view node to it
        this.#shadowDOM = this.attachShadow({ mode: "open" })
        const options = this.#getMasterSelectOptions()
        const view = this.#getView(options)
        this.#shadowDOM.append(view)

        const customSelectLabel = this.#shadowDOM.querySelector(".customSelectLabel")
        customSelectLabel.addEventListener('click', () => this.#optionsListOpenClose())

        window.addEventListener('keydown', e => this.#keyboardListener(e))

        this.#customOptions = [...this.#shadowDOM.querySelectorAll('.customSelectOption')]
        this.#customOptions.forEach(option => option.addEventListener('click', () => this.#setAsSelected(this.#selectReferenceSelector, option, this.#customOptions)))
    }

    #getMasterSelectOptions(){
        const options = this.#selectReference.querySelectorAll("option")
        const formattedOptions = [...options].map(option => {
            return {
                value : option.value,
                label : option.label,
                selected : option.selected,
                originalElement : option
            }
        })

        // console.log(formattedOptions)
        return formattedOptions
    }

    get ShadowDOMNode(){
        return this.#shadowDOM
    }

    #getView(masterSelectOptions){
        const viewContainer = document.createElement("template")
        viewContainer.innerHTML = `
        <link rel="stylesheet" href="../css/customSelect.css"/>
        <div class="customSelectContainer">
            <span class="customSelectLabel">Ingrédients<img class="customSelectArrow" src="./assets/icons/select-arrow.svg"/></span>
            <ul class="customSelectOptionsContainer">`+
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

    #optionsListOpenClose(){
        const optionsContainer = this.#shadowDOM.querySelector(".customSelectOptionsContainer")
        const arrow = this.#shadowDOM.querySelector(".customSelectArrow")
        if(optionsContainer.style.display === "none" || optionsContainer.style.display === "") { 
            optionsContainer.style.display = 'flex'
            arrow.style.transform = "rotate(0deg)"
        }
        else{ 
            optionsContainer.style.display = 'none'
            arrow.style.transform = "rotate(180deg)"
        }                  
    }

    #setAsSelected(selectSelector, customOption, customOptions){
        customOptions.forEach(option => option.style.background="none")
        const select = document.querySelector(selectSelector)
        console.log(customOption)
        select.value = customOption.getAttribute("data-value")
        customOption.style.background="black"
    }
}

customElements.define("custom-select", CustomSelect)