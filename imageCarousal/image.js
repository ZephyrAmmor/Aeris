class ImageCarousel {
    allCards = []
    active = 1
    constructor (holder, items, left, right) {
        for (let item of items) {
            const image = document.createElement('img')
            image.src = item.src
            image.style.width = item.width
            image.style.height = item.height
            image.classList.add('card')
            this.allCards.push(image)
        }
        const firstDiv = document.createElement('div')
        const lastDiv = document.createElement('div')

        this.allCards.unshift(firstDiv)
        this.allCards.push(lastDiv)
        autoScroll(this.allCards, this.active, holder, 3000, this.allCards.length)
        left.addEventListener('click', () =>{
            if (this.active > 1) {
                this.active --
                renderCarousel(this.allCards, this.active, holder)
            }
        })

        right.addEventListener('click', () =>{
            if (this.active < this.allCards.length -2) {
                this.active ++
                renderCarousel(this.allCards, this.active, holder)
            }
        })
    }
}

function renderCarousel(allCards, active, holder) {
    const activeDom = holder.querySelector('.active')
    if (activeDom) {
        activeDom.classList.remove('active')
    }
    while (holder.firstChild) {
        holder.firstChild.remove()
    }
    for (let i = active - 1; i <= active + 1; i ++) {
        if (i === active) {
            allCards[i].classList.add('active')
        }
        holder.appendChild(allCards[i])
    }
}
function autoScroll (allCards, active, holder, time, totalLength) {
    if (active < totalLength - 1) {
        renderCarousel(allCards, active, holder)
        setTimeout(() => {
            active ++ 
            autoScroll(allCards, active, holder, time, totalLength)
        }, time);
    } else if (active === totalLength -1){
        autoScroll(allCards, 1, holder, time, totalLength)
    } else {
        return
    }
}
const holder = document.querySelector('.cards-holder')
const left = document.querySelector('#left')
const right = document.querySelector('#right')
const carouse = new ImageCarousel(holder, [
    {src : './pexels-pixabay-33109.jpg', width : '200px', height : '200px'},
    {src : './pexels-thatguycraig000-1563355.jpg', width : '200px',height : '200px'},
    {src : './WilliamXTommy.png', width : '200px'},
    {src : './TommyXWilliam.png', width : '200px'},
    {src : './292d457e39d78e0fca1373807493fdf4.png', width : '200px', height : '200px'}
], left, right)