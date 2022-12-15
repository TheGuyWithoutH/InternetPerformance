import React from 'react';
import '../Assets/Styles/DataOverview.css';
import MapView from '../Components/Data/MapView';
import Header from '../Components/Header';

const Papers = () => {
    return (
        <>
            <div className='data-overview-header'>
                <h1 className='data-overview-title'>Title of the Papers Section</h1>
                <p className='data-overview-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis urna quis massa tincidunt, vehicula bibendum ligula tristique. Quisque tristique nulla pellentesque, condimentum eros eget, scelerisque eros. Ut faucibus odio sapien, sit amet suscipit nisi semper vulputate. Mauris lacinia pretium tempor.</p>
            </div>
        </>
    );
};

export default Papers;