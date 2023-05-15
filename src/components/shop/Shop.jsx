import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)


    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumbers = []
    // for (let i = 1; i <= totalPages; 1++) {
    //     pageNumbers.push(i)
    // }

    // olternative way

    const pageNumbers = [...Array(totalPages).keys()]

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cardProduct => {
                // step :1 get id
                for (const id in storedCart) {
                    //   step 2: get the product using by id
                    const addedProduct = cardProduct.find(product => product._id === id)
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
            })



    }, [])



    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);

            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);




    const productHandle = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product._id)
    }

    const clearAllProductHandle = () => {
        setCart([]);
        deleteShoppingCart()
    }


    const options = [5, 10, 15, 20]   // TODO : make in dynamic
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        products.map(product =>
                            <Product
                                key={product._id}
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
            {/* pagination  */}
            <div className="pagination">
                <p>Current page : {currentPage} And items PerPage {itemsPerPage}</p>
                {
                    pageNumbers.map(number =>
                        <button
                            className={currentPage === number ? 'selected' : ''}
                            key={number}
                            onClick={() => setCurrentPage(number)}
                        >{number}
                        </button>
                    )
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;