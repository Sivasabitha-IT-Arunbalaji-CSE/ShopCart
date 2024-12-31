// services/cartService.js
export const addItemToCart = (cart, item) => {
    cart.push(item);
    return cart;
};

export const removeItemFromCart = (cart, itemId) => {
    return cart.filter(item => item.id !== itemId);
};
