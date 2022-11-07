import React from 'react';
import WorldMap from '../Components/Data/WorldMap';
import '../Assets/Styles/DataOverview.css';

const DataOverview = () => {
    return (
        <div className='page bubbles'>
            <h1 className='titleDataOverview'>Data Overview</h1>
            <WorldMap/>
        </div>
    );
};

export default DataOverview;