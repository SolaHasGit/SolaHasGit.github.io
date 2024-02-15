const meal = document.querySelector('main');
const cartItems = document.getElementById('cartItems');
const showTotal = document.getElementById('total');

let cart = [];

meal.addEventListener('click', cartMobility);
   
function cartMobility(event){
    const dish = event.target;

    if (dish.classList.contains('add')) {
        addToCart(dish);
    } else if (dish.classList.contains('remove')) {
        removeFromCart(dish);
    }
}   


function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
}

function removeFromCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    cart = cart.filter(item => item.name !== name);

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.setAttribute('data-name', item.name);
        removeButton.setAttribute('data-price', item.price);

        li.appendChild(removeButton);
        cartItems.appendChild(li);

        total += item.price;
    }

    showTotal.textContent = `Total: $${total.toFixed(2)}`;
}