import React from 'react';
import Map from '../Components/Data/Map';
import '../Assets/Styles/DataOverview.css';

const DataOverview = () => {
    return (
        <div className='page bubbles'>
            <h1 className='titleDataOverview'>Data Overview</h1>
            <Map/>
        </div>
    );
};

export default DataOverview;