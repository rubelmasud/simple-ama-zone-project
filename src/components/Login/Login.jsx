import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provaiders/authProvaider';
import localforage from 'localforage';

const Login = () => {

    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null)
    const { singIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'


    const handleLogIn = (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email, password)

        singIn(email, password)
            .then(result => {
                const logUser = result.user
                setUser(logUser)
                form.reset
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    return (
        <div className='from-container'>
            <h1 className='from-title'>Login</h1>
            <form onSubmit={handleLogIn} action="">
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? 'text' : "password"} name='password' required />
                    <p onClick={() => setShow(!show)}> <small>
                        {
                            show ? <span>Hide Password</span>
                                : <span>Show Password</span>
                        }
                    </small></p>
                </div>
                <input className='submit-btn' type="submit" value="Login" />
            </form>
            <p><small>New to Ema-john? <Link to='/signup'>Create New Account</Link></small></p>
            <p>{user && <span>Welcome {user.email}</span>}</p>
        </div>
    );
};

export default Login;