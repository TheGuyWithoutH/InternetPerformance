/**
 * @file Main menu component
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styles for the menu indicator (the line under the tabs)
const tabsStyles = {
    '/': {
        width: 0,
    },
    '/overview': {
        width: "22%",
        translate: "-5%"
    },
    '/search': {
        width: "27%",
        translate: "103%"
    },
    '/papers': {
        width: "18%",
        translate: "343%"
    },
    '/about': {
        width: "15%",
        translate: "575%"
    }
}

const Menu = () => {
    const page = useLocation().pathname;
    return (
        <div className='main-menu'>
            <div className='main-menu-tabs'>
                <Link to="/overview" className='tab-link'>Overview</Link>
                <Link to="/search" className='tab-link'>Search Data</Link>
                <Link to="/papers" className='tab-link'>Papers</Link>
                <Link to="/about" className='tab-link'>About</Link>
            </div>
            <div style={{position: 'relative', width: '100%', height: '8px', marginTop: '10px'}}>
                <div className='main-menu-indicator' style={tabsStyles[page]}/>
                <div className='main-menu-indicator-bg'/>
            </div>
        </div>
    );
};

export default Menu;