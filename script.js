// carrinho de compras
let cart = []
let modalQt = 1
let modalKey = 0

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
        modalKey = key

        q('.pizzaBig img').src = pizzaJson[key].img
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.', ',')}`
        q('.pizzaInfo--size.selected').classList.remove('selected')


        qA('.pizzaInfo--size').forEach((pizzaSize, sizeIndex) => {

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
const closeModal = () => {
    q('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => q('.pizzaWindowArea').style.display = 'none', 500)
}

qA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item => item.addEventListener('click', closeModal))

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

q('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let key = cart.findIndex(item => item.identifier == identifier)

    if (key > -1) {

        cart[key].qt += modalQt

    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        })
    }

    updateCart()

    closeModal()

})

function updateCart() {
    if (cart.length > 0) {
        q('aside').classList.add('show')

        q('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id)

            subtotal += pizzaItem.price * cart[i].qt

            let cartItem = q('.models .cart--item').cloneNode(true)

            let pizzaSizeName

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {

                if (cart[i].qt > 1) {
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                }

                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                    updateCart()
            })

            q('.cart').append(cartItem)

        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        q('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2).replace('.', ',')}`
        q('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2).replace('.', ',')}`
        q('.total span:last-child').innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`

    } else {
        q('aside').classList.remove('show')
    }
}