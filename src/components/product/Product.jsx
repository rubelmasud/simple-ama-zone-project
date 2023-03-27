import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {

    const { name, category, img, price, ratings } = props.product
    const productHandle = props.productHandle
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-info">
                <h5 className='product-name'>{name}</h5>
                <p>Prize:${price}</p>
                <p>Manufacturer:{category}</p>
                <p>Ratting:{ratings} stars</p>
            </div>
            <button onClick={() => productHandle(props.product)} className='btn-cart'>
                Add To Cart
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>
        </div>
    );
};

export default Product;