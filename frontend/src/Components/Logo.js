import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/Images/logo.png'

const Logo = () => {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <div className='main-logo'>
                <img src={logo} alt="logo" className='main-logo-image' />
                <div className="main-logo-text">
                    <h1>Internet Performance</h1>
                    <h2>From User Application</h2>
                </div>
            </div>
        </Link>
    );
};

export default Logo;