import React, { useEffect, useState } from 'react';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('../../../public/fakeData/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const productHandle = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
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
                <h3>Order Summery</h3>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;