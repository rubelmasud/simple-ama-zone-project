import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {


    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0

    for (const product of cart) {
        product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping
        quantity = quantity + product.quantity
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h3>Order Summery</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price:${totalPrice}</p>
            <p>Total Shipping:${totalShipping}</p>
            <p>Tax:${tax.toFixed(2)}</p>
            <h5>Grand Total:${grandTotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;