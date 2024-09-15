document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        const products = [
            { id: 1, name: 'Ladies Suit 1', price: 100 },
            { id: 2, name: 'Men\'s Suit 1', price: 150 },
            { id: 3, name: 'Gown 1', price: 200 }
        ];

        let cartHTML = '<ul>';
        cart.forEach(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cartHTML += `<li>${product.name} - $${product.price}</li>`;
            }
        });
        cartHTML += '</ul>';
        cartItemsContainer.innerHTML = cartHTML;
    }
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    localStorage.removeItem('cart');
    localStorage.setItem('orderDetails', JSON.stringify({ name, email, address, cart }));

    window.location.href = 'order.html';
});
