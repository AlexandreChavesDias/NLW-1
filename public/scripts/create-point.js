
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += '<option value="${state.id}">${state.nome}/option>'
            }
        })
}

popularUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectIndex
    stateInput.valu = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}/option>`
            }

        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities())

//itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("clic", handleSelectedItem)
}

const  colletedItems = document.querySelector("input[name=items]")

let selectItems = []

function handleSelectedItem(event) {

    const item = event.target

    itemId.classList.toggle("selected")
    const itemId = eventLi.dataset.id



    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectItems = filteredItems
    } else {
        selectItems.push(itemId)
    }
    console.log(selectItems)

    colletedItems.value = selectItems
}
