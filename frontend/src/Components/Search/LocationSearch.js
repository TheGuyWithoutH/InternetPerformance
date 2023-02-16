/**
 * @file Location search component for the search data page and location selection
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';

import SearchMap from './SearchMap';

const LocationSearch = ({tab, switchTab }) => {

    return (
        <div className='search-location-content'>
            <div className='search-location-filters'>
                <div className='search-location-filters-category'>
                    <h3>Country</h3>
                    <select id='category-1' name='category-1'>
                        <option value="" disabled selected>Select a country</option>
                        <option value='brazil'>Brazil</option>
                        <option value='country'>United States</option>
                        <option value='country'>Canada</option>
                        <option value='country'>China</option>
                        <option value='country'>Japan</option>
                        <option value='country'>Germany</option>
                        <option value='country'>France</option>
                        <option value='country'>United Kingdom</option>
                        <option value='country'>Italy</option>
                        <option value='country'>Spain</option>
                        <option value='country'>India</option>
                        <option value='country'>Australia</option>
                        <option value='country'>Mexico</option>
                        <option value='country'>Russia</option>
                        <option value='country'>South Korea</option>
                        <option value='country'>Indonesia</option>
                        <option value='country'>Netherlands</option>
                        <option value='country'>Turkey</option>
                        <option value='country'>Switzerland</option>
                    </select>
                </div>
                <div className='search-location-filters-category'>
                    <h3>Region</h3>
                    <select id='category-1' name='category-1' value='category-1' disabled={true} />
                </div>
                <div className='search-location-filters-category'>
                    <h3>City</h3>
                    <select id='category-1' name='category-1' value='category-1' disabled={true} />
                </div>
                <p className='search-location-filters-tip'>Or double click on the map to select a point</p>
                <button className='search-location-filters-confirm' >Add This Location</button>
            </div>
            <div className='search-location-results'>
                <SearchMap />
                <div className='search-location-results-table'>
                    <div className='search-location-results-table-entry'>
                        <p>São Paulo, São Paulo, Brasil</p>
                        <img className='search-location-results-table-entry-delete' src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png" alt="Delete"/>
                    </div>
                    <div className='search-location-results-table-entry'>
                        <p>Wuhan, Hubei, China</p>
                        <img className='search-location-results-table-entry-delete' src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png" alt="Delete"/>
                    </div>
                    <div className='search-location-results-table-empty'>
                        <p>Location 3</p>
                    </div>
                    <button style={{background: 'none', border: 'none', height: '40px', width: '40px'}} onClick={() => switchTab(tab + 1)}>
                        <img className='search-location-filters-confirm-icon' src="https://cdn-icons-png.flaticon.com/512/318/318476.png " alt="Next" title=""/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationSearch;