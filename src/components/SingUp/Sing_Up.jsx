import React, { useContext, useState } from 'react';
import './SingUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provaiders/authProvaider';

const Sing_Up = () => {

    const [error, setError] = useState('')
    const { createUser } = useContext(AuthContext)



    const handleSignUp = event => {
        event.preventDefault()
        const from = event.target
        const email = from.email.value
        const password = from.password.value
        const confirm = from.confirm.value

        setError('')
        if (password !== confirm) {
            setError('Your password is dose not match!!')
            return
        }
        else if (password.length < 6) {
            setError('password is 6 characters be must!!')
            return
        }
        createUser(email, password)
            .then(result => {
                const logUser = result.user
                console.log(logUser);
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }
    return (
        <div className='from-container'>
            <h1 className='from-title'>Sign Up</h1>
            <form onSubmit={handleSignUp} action="">
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='confirm' required />
                </div>
                <input className='submit-btn' type="submit" value="Sign Up" />
            </form>
            <p ><small>Already have an Account? <Link to='/login'> Please Login</Link></small></p>
            <p className='error'>{error}</p>
        </div>
    );
};

export default Sing_Up;