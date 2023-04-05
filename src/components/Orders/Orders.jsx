import React, { useState } from 'react';
import Cart from '../cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'


const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);


    const handleRemoveCart = (id) => {
        const remaining = cart.filter(product => product.id !== id)
        setCart(remaining)
        removeFromDb(id)
    }


    const clearAllProductHandle = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItems
                        product={product}
                        key={product.id}
                        handleRemoveCart={handleRemoveCart}
                    ></ReviewItems>)
                }
            </div>
            <div className="card-container">
                <Cart
                    cart={cart}
                    clearAllProductHandle={clearAllProductHandle}
                >
                    <Link to='/checkout' className='btn-proceed'>
                        <span> Proceed Checkout</span>
                        <span> <FontAwesomeIcon icon={faCalculator} /></span>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;