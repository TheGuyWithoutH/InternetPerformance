/**
 * @file Table component for the search page that displays the results of the search in a table format
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';

const TableSearch = ({tab, switchTab }) => {
    return (
        <div className='search-table-content'>
            <table className='search-table-table'>
                <tr>
                    <th><input type={"checkbox"} checked/></th>
                    <th>User ID</th>
                    <th>Stream ID</th>
                    <th>Location</th>
                    <th>Latency</th>
                    <th>Timestamp</th>
                </tr>
                <tr>
                    <td><input type={"checkbox"} checked/></td>
                    <td>Anom</td>
                    <td>19</td>
                    <td>Male</td>
                    <td>Male</td>
                    <td>Male</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} checked/></td>
                    <td>Megha</td>
                    <td>19</td>
                    <td>Female</td>
                    <td>Male</td>
                    <td>Male</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} checked/></td>
                    <td>Subham</td>
                    <td>25</td>
                    <td>Male</td>
                    <td>Male</td>
                    <td>Male</td>
                </tr>
            </table>
            <div className='search-table-navigation'>
                <div className='search-table-navigation-pages'>
                </div>
                <button style={{background: 'none', border: 'none', height: '40px'}} onClick={() => switchTab(tab + 1)}>
                    <img className='search-time-filters-confirm-icon' src="https://cdn-icons-png.flaticon.com/512/318/318476.png " alt="Next" title=""/>
                </button>
            </div>
        </div>
    );
};

export default TableSearch;