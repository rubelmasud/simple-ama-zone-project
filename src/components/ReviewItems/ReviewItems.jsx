import React from 'react';
import './ReviewItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'



const ReviewItems = ({ product, handleRemoveCart }) => {
    const { _id, price, img, name, quantity } = product
    return (
        <div className='review-items'>
            <img src={img} alt="" />
            <div className="cart-Details">
                <div className="cart-info">
                    <p className='product-name'>{name}</p>
                    <p> Price :<span className='cart-price'>${price}</span></p>
                    <p>Quantity : <span className='cart-price'>$ {quantity}</span></p>
                </div>
                <div className="button-section">
                    <button onClick={() => handleRemoveCart(_id)}> <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} /></button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;