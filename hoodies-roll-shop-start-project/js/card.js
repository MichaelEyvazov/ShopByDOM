const cartWrapper = document.querySelector('.cart-wrapper');
window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerHTML,
            // itemsInBox: card.querySelector('[data-items-in-box]').innerHTML,
            // weight: card.querySelector('.price__weight').innerHTML,
            price: card.querySelector('.price__currency').innerHTML,
            counter: card.querySelector('[data-counter]').innerHTML,
        };

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerHTML = parseInt(counterElement.innerHTML) + parseInt(productInfo.counter);
        } else {

            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
                                    <div class="cart-item__top">
                                        <div class="cart-item__img">
                                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                                        </div>
                                        <div class="cart-item__desc">
                                            <div class="cart-item__title">${productInfo.title}</div>
                                            <!-- // <div class="cart-item__weight">${productInfo.itemsInBox} --> <!--${productInfo.weight}</div> -->
    
                                            <!-- cart-item__details -->
                                            <div class="cart-item__details">
    
                                                <div class="items items--small counter-wrapper">
                                                    <div class="items__control" data-action="minus">-</div>
                                                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                                                    <div class="items__control" data-action="plus">+</div>
                                                </div>
    
                                                <div class="price">
                                                    <div class="price__currency">${productInfo.price}</div>
                                                </div>
                                                <div>
                                                <button type="button" class="btn btn-danger" data-action="delete">Cancel</button>
                                                </div>
    
                                            </div>
                                            <!-- // cart-item__details -->
    
                                        </div>
                                    </div>
                                </div>`;
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }
        card.querySelector('[data-counter]').innerHTML= '1';

        	// The contribution of the status of the basket is empty / complete
		toggleCartStatus();

		// Recalculation of the total cost of goods in the basket
		calcCartPriceAndDelivery();
    }
});

function toggleCartStatus() {

    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    // const orderForm = document.querySelector('#order-form');

    if (cartWrapper.children.length > 0) {
        console.log('FULL');
        cartEmptyBadge.classList.add('none');
        // orderForm.classList.remove('none');
    } else {
        console.log('EMPTY');
        cartEmptyBadge.classList.remove('none');
        // orderForm.classList.add('none');
    }

}

function calcCartPriceAndDelivery() {
	const cartWrapper = document.querySelector('.cart-wrapper');
	const priceElements = cartWrapper.querySelectorAll('.price__currency');
	const totalPriceEl = document.querySelector('.total-price');
	const deliveryCost = document.querySelector('.delivery-cost');
	const cartDelivery = document.querySelector('[data-cart-delivery]');

	// Total price of goods
	let priceTotal = 0;

	// We go around all blocks with prices in the basket
	priceElements.forEach(function (item) {
		// We find the quantity of goods
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		// Add the value of the goods to the total cost (number * price)
		priceTotal += parseInt(item.innerHTML) * parseInt(amountEl.innerHTML);
	});

	// We display the price on the page
	totalPriceEl.innerHTML = priceTotal;

	// We hide / show the block with the cost of delivery
	if (priceTotal > 0) {
		cartDelivery.classList.remove('none');
	} else {
		cartDelivery.classList.add('none');
	}

	//We indicate the cost of delivery
	if (priceTotal >= 600) {
		deliveryCost.classList.add('free');
		deliveryCost.innerHTML = 'Free';
	} else {
		deliveryCost.classList.remove('free');
		deliveryCost.innerHTML = '250 $';
	}
}