function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufselect.innerHTML += `<Option value="${state.id}">${state.nome}</opition>`

            }


        })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML += ""
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => { //aray = coleção


            for (const city of cities) {

                citySelect.innerHTML += `<Option value="${city.nome}">${city.nome}</opition>`


            }

            citySelect.disabled = false




        })
}



document
    .querySelector("select[name=uf]") //chamando o seletor
    .addEventListener("change", getCities)
    //observador de eventos


//Itens de Coleta 
//pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) //callback function que so executa quando for clicada
}
const collectedItems = document.querySelector("input[name=items]")

//variavel
let selectedItems = [] //itens selecionados vazios //let = aray

function handleSelectedItem(event) { //pega a classe editada no css e adicionar ao click do mouse, e ao outro click remove
    const itemLi = event.target

    //adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    console.log('ITEM ID: ', itemId)


    //verificar quais são os items selecionados, se sim
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex(item => { //função anonima pode so usar setinha
        //recebe true or false
        const itemFound = item == itemId //dois igual é para comparar
        return itemFound //retornar
    })

    //se ja tiver selecionado,

    if (alreadySelected >= 0) {
        //tirar  da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)
    }


    console.log('selectedItems: ', selectedItems)

    //atualizar o campo hilden(campo escondido) com os items selecionados

    collectedItems.value = selectedItems




}