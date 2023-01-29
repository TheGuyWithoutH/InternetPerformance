/**
 * @file The data overview page
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';
import '../Assets/Styles/DataOverview.css';
import MapView from '../Components/Data/MapView';
import ScaleOverview from '../Components/Data/ScaleOverview';
import Header from '../Components/Header';

const DataOverview = () => {
    return (
        <>
            <div className='data-overview-header'>
                <h1 className='data-overview-title'>Title of the Overview</h1>
                <p className='data-overview-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis urna quis massa tincidunt, vehicula bibendum ligula tristique. Quisque tristique nulla pellentesque, condimentum eros eget, scelerisque eros. Ut faucibus odio sapien, sit amet suscipit nisi semper vulputate. Mauris lacinia pretium tempor.</p>
            </div>
            <div className='data-overview'>
                <MapView/>
                <ScaleOverview/>
            </div>
        </>
    );
};

export default DataOverview;