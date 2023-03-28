class CustomSelect extends HTMLElement{
    #shadowDOM
    #selectValue
    #selectReference = document.querySelector("#select-ingredients")
    #selectReferenceSelector = "#select-ingredients"

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

        console.log(formattedOptions)
        return formattedOptions
    }

    setView(){

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
            class="customSelectOption ${ option.selected === true ? 'selectedOption' : ''  }" 
            onclick="CustomSelect.setAsSelected('${this.#selectReferenceSelector}', '${option.value}'), this">
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

    static setAsSelected(selectSelector, optionValue, selectedOption){
        const select = document.querySelector(selectSelector)
        select.value = optionValue
        selectedOption.style.border="1px solid red"
    }
}

customElements.define("custom-select", CustomSelect)