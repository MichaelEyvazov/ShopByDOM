window.addEventListener('click', function (event) {

    // We declare a "variable" for the counter
    let counter;

    // Check the click strictly according to the buttons plus or minus
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // We find the counter wrapper
        const counterWrapper = event.target.closest('.counter-wrapper');
        // Wind div with data-counter
        counter = counterWrapper.querySelector('[data-counter]');
    }

    // We check whether the element is made by the click button plus
    if (event.target.dataset.action === 'plus') {
        counter.innerHTML = ++counter.innerHTML;
    }

    // We check whether the element is made by the click of the button minus
    if (event.target.dataset.action === 'minus') {

        //We check that the counter is more than 1
        if (parseInt(counter.innerHTML) > 1 ) {
            // Change the text in the counter, reducing it by 1
            counter.innerHTML = --counter.innerHTML;
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerHTML) === 1) {
            // Checking for the goods in the basket
            console.log('IN CART!!!!');
            // Remove the goods from the basket
            event.target.closest('.cart-item').remove();

            // The contribution of the status of the basket is empty / complete
            toggleCartStatus();

            // Recalculation of the total cost of goods in the basket
            calcCartPriceAndDelivery();
        }

    }
    if (event.target.dataset.action === 'delete') {
        event.target.closest('.cart-item').remove();
        toggleCartStatus();
        calcCartPriceAndDelivery();
    }

    // Check the click on + or - inside the corizine
    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        // Recalculation of the total cost of goods in the basket
        calcCartPriceAndDelivery();
    }
});