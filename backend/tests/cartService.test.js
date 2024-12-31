// tests/cartService.test.js
import { addItemToCart, removeItemFromCart } from '../services/cartService';

describe('Cart Service Tests', () => {

    describe('Add Item to Cart', () => {
        test('should add an item to the cart', () => {
            const cart = [];
            const item = { id: 1, name: 'Product 1', price: 100 };

            const updatedCart = addItemToCart(cart, item);

            expect(updatedCart).toHaveLength(1);
            expect(updatedCart[0]).toEqual(item);
        });
    });

    describe('Remove Item from Cart', () => {
        test('should remove an item from the cart', () => {
            const cart = [{ id: 1, name: 'Product 1', price: 100 }];
            const itemId = 1;

            const updatedCart = removeItemFromCart(cart, itemId);

            expect(updatedCart).toHaveLength(0);
        });

        test('should not remove any item if itemId does not exist', () => {
            const cart = [{ id: 1, name: 'Product 1', price: 100 }];
            const itemId = 2;

            const updatedCart = removeItemFromCart(cart, itemId);

            expect(updatedCart).toHaveLength(1);
            expect(updatedCart[0].id).toBe(1);
        });
    });
});
