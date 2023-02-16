/**
 * @file Time frame search component for the time frame search tab of the search page
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';

const TimeFrameSearch = ({tab, switchTab }) => {
    return (
        <div className='search-time-content'>
            <div className='search-time-filters'>
                <div className='search-time-filters-category'>
                    <h3>Starting from</h3>
                    <input type='datetime-local' id='starting-date' name='starting-date' step={1}/>
                </div>
                <div className='search-time-filters-category'>
                    <h3>Ending at</h3>
                    <input type='datetime-local' id='starting-date' name='starting-date' step={1}/>
                </div>
                <div className='search-time-filters-category'>
                    <h3>Locations</h3>
                    <div className='search-time-location-entry selected'>
                        <p>São Paulo, São Paulo, Brasil</p>
                    </div>
                    <div className='search-time-location-entry'>
                        <p>São Paulo, São Paulo, Brasil</p>
                    </div>
                    <div style={{width: "auto", margin: "10px 0"}} className='search-time-location-entry'>
                        <p>São Paulo, São Paulo, Brasil</p>
                    </div>
                </div>
                <p className='search-time-filters-tip'>Or select on the graph the time period you want using the slider</p>
                <button style={{background: 'none', border: 'none', height: '40px'}} onClick={() => switchTab(tab + 1)}>
                    <img className='search-time-filters-confirm-icon' src="https://cdn-icons-png.flaticon.com/512/318/318476.png " alt="Next" title=""/>
                </button>
            </div>
            <div className='search-time-results'>
                <p>Graphs</p>
            </div>
        </div>
    );
};

export default TimeFrameSearch;