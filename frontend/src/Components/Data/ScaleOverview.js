import React from 'react';

import '../../Assets/Styles/Components/ScaleOverview.css';

const ScaleOverview = () => {
    return (
        <div className='scale-overview'>
            <h1 className='scale-overview-title'>User Data</h1>
            <div className='scale-overview-content'>
                <div className='scale-overview-gradient'/>
                <div className='scale-overview-text'>
                    <p className='scale-overview-text-max'>&gt; 1000</p>
                    <p className='scale-overview-text-min'>&lt; 100</p>
                </div>
            </div>
        </div>
    );
};

export default ScaleOverview;