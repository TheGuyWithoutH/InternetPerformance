import React from 'react';
import '../Assets/Styles/DataOverview.css';
import MapView from '../Components/Data/MapView';

const DataOverview = () => {
    return (
        <div className='page bubbles'>
            <h1 className='titleDataOverview'>Data Overview</h1>
            <MapView/>
        </div>
    );
};

export default DataOverview;