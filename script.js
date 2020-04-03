let modalQt = 1
// query selector alias
const q = el => document.querySelector(el)
const qA = el => document.querySelectorAll(el)

// pizzas list
pizzaJson.map((pizza, pizzaIndex) => {
    // clone
    const pizzaItem = q('.models .pizza-item').cloneNode(true)
    
    // add
    pizzaItem.setAttribute('data-key', pizzaIndex);
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2).replace('.', ',')}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description

    pizzaItem.querySelector('a').addEventListener('click', e => {
        e.preventDefault()

        const key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1


        q('.pizzaBig img').src = pizzaJson[key].img
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.', ',')}`
        q('.pizzaInfo--size.selected').classList.remove('selected')


        qA('.pizzaInfo--size').forEach( (pizzaSize, sizeIndex) => {

            if (sizeIndex == 2) {
                pizzaSize.classList.add('selected')
            }

            pizzaSize.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        q('.pizzaInfo--qt').innerHTML = modalQt

        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            q('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    // fill 
    q('.pizza-area').append(pizzaItem)
})

// Modal events
const closeModal =  () => {
    q('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => q('.pizzaWindowArea').style.display = 'none', 500)
}

qA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach( item => item.addEventListener('click', closeModal))

q('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--
        q('.pizzaInfo--qt').innerHTML = modalQt
    }
})

q('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    q('.pizzaInfo--qt').innerHTML = modalQt
})

qA('.pizzaInfo--size').forEach((pizzaSize, sizeIndex) => {
    pizzaSize.addEventListener('click', e => {
        q('.pizzaInfo--size.selected').classList.remove('selected')
        pizzaSize.classList.add('selected')
    })
})