import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];

        // step :1 get id
        for (const id in storedCart) {
            //   step 2: get the product using by id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {

                // step 3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity
                // step-4
                savedCart.push(addedProduct)
            }
        }
        // step-5
        setCart(savedCart)
    }, [products])

    useEffect(() => {
        fetch('../../../public/fakeData/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const productHandle = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }

    const clearAllProductHandle = () => {
        setCart([]);
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product =>
                        <Product
                            key={product.id}
                            product={product}
                            productHandle={productHandle}
                        ></Product>
                        // console.log(product);
                    )
                }
            </div>
            <div className="card-container">
                <Cart
                    cart={cart}
                    clearAllProductHandle={clearAllProductHandle}
                >
                    <Link to='/orders' className='btn-proceed'>
                        <span className='btn-proceed'>Review Order</span>
                        <span> <FontAwesomeIcon icon={faArrowRight} /></span>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;