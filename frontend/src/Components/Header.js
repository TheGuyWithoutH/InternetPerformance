/**
 * @file Header component
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';
import Logo from './Logo';
import Menu from './Menu';

const Header = ({page}) => {
    return (
        <header className='main-header'>
            <Logo/>
            <Menu/>
        </header>
    );
};

export default Header;