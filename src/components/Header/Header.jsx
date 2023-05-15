import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provaiders/authProvaider';



const Header = () => {

    const { user, logOut } = useContext(AuthContext)
    // console.log(user);

    const handleLogOut = () => {
        logOut()
            .then(result => { })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='list-items'>
                <Link to="orders">Order</Link>
                <Link to="/">Shop</Link>
                <Link to="inventory">Inventory</Link>
                <Link to="login">Login</Link>
                <Link to="signup">Sign up</Link>
                <p>{user && <span className='user'>{user.email}</span>} <button onClick={handleLogOut}>Sign Out</button></p>
            </div>
        </nav>
    );
};

export default Header;