class Dropdown {
    list
    onSelect
    constructor (button, eventType, parentNode, items, navigation, onSelectFunc) {
        this.list = parentNode
        this.list.setAttribute('tabindex', '-1')
        this.list.style.display = 'none'
        this.onSelect = onSelectFunc
        for (let item of items) {
            this.addItemObject(item)
        }
        button.addEventListener(eventType, () =>{
            if (this.list.style.display === 'none') {
                this.list.style.display  = 'block'
            } else {
                this.list.style.display = 'none'
            }
            this.list.focus()
        })
        if (navigation && navigation.keyboardNavigation === true) {
            this.list.addEventListener('keydown', (event) =>{
                const value = event.key
                if (value === 'ArrowUp') {
                    const active = this.list.querySelector('.active')
                    if (active) {
                        active.classList.remove('active')
                    }
                    if (active && active.previousElementSibling) {
                        active.previousElementSibling.classList.add('active')
                    } else {
                        this.list.lastElementChild.classList.add('active')
                    }
                } else if (value === 'ArrowDown') {
                    const active = this.list.querySelector('.active')
                    if (active) {
                        active.classList.remove('active')
                    }
                    if (active && active.nextElementSibling) {
                        active.nextElementSibling.classList.add('active')
                    } else {
                        this.list.firstElementChild.classList.add('active')
                    }
                } else if (value === 'Enter') {
                    const active = this.list.querySelector('.active') 
                    if (active) {
                        const activeObj = {label : active.textContent, value : active.dataset.value, disabled : active.disabled ? true : false}
                        this.onSelect(activeObj)
                    }
                }
            })
        }
    }
    addItemObject(item, position='append') {
        const domItem = document.createElement('div')
        domItem.classList.add('drop-down-item')
        domItem.textContent = item.label
        domItem.dataset.value = item.value
        if (item.disabled === true) {
            domItem.disabled = true
        }
        domItem.addEventListener('click', () =>{
            if (!domItem.disabled) {
                const activeObj = {label : domItem.textContent, value : domItem.dataset.value, disabled : domItem.disabled ? true : false}
                this.onSelect(activeObj)
            }
        })
        domItem.addEventListener('mouseover', () =>{
            if (!domItem.disabled) {
                domItem.classList.add('active')
            }
        })
        domItem.addEventListener('mouseout', () =>{
            if (!domItem.disabled) {
                domItem.classList.remove('active')
            }
        })
        if (position === 'prepend') {
            this.list.prepend(domItem)
        } else {
            this.list.appendChild(domItem)
        }
    }
    removeItemNodeByValue(value){
        if (value) {
            const itemToRemove = this.list.querySelector(`[data-value=${value}]`)
            itemToRemove.remove()
        }
    }
    open () {
        this.list.style.display = 'block'
    }
    close () {
        this.list.style.display = 'none'
    }
    removeAllItems () {
        while (this.list && this.list.firstElementChild) {
            this.list.firstElementChild.remove()
        }
    }
}

const parentNode = document.querySelector('.drop-down')
const button = document.querySelector('.drop-down-btn') 
function onSelectFunc (item) {
    console.log(item)
}
const dropDown = new Dropdown(button, 'click', parentNode, [
    {label : 'Hello', value : 'hello'},
    {label : 'Odin', value :'odin'},
    {label : 'Odinite', value : 'odinite'},
    {label : 'Log Out', value : 'logout', disabled : true}
], {keyboardNavigation : true}, onSelectFunc)

dropDown.removeItemNodeByValue('odinite')
dropDown.addItemObject({label : 'FSO', value : 'fso', }, 'prepend')
const close = document.querySelector('.close')
close.addEventListener('click', () => {
    dropDown.close()
})
const open = document.querySelector('.open')
open.addEventListener('click', () => {
    dropDown.open()
})
const clean = document.querySelector('.clean')
clean.addEventListener('click', () => {
    dropDown.removeAllItems()
})
