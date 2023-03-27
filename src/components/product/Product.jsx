import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props.product)
    const { name, id, category, img, price, ratings, seller } = props.product
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-info">
                <h5 className='product-name'>{name}</h5>
                <p>Prize:${price}</p>
                <p>Manufacturer:{category}</p>
                <p>Ratting:{ratings} stars</p>
            </div>
            <button className='btn-cart'>Add To Cart</button>
        </div>
    );
};

export default Product;