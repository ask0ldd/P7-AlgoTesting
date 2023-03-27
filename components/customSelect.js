class CustomSelect extends HTMLElement{
    constructor(){
        super()
    }
}

customElements.define("custom-select", CustomSelect)

function getSelectView(options){
    const view = `
    <div class="customSelectContainer">
        <span class="customSelectLabel></span>
        <ul class="customSelectOptionsContainer">
            <li class="customSelectOption">Option 1</li>
            <li class="customSelectOption">Option 2</li>
            <li class="customSelectOption">Option 3</li>
        </ul>
    </div>
    `
    return view
}