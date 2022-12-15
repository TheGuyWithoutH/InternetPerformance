import React from 'react';

const CountryModal = ({geo, data, color, setModal}) => {
    return (
        <div className='country-modal-bg' onClick={() => setModal(null)}>
            <div className='country-modal' onClick={(e) => e.stopPropagation()}>
                <h1 className='country-modal-title'>{geo.properties.name}</h1>
                <div className='country-modal-content'>
                    <div className='country-modal-infos'>
                        <img className='modal-map' src="http://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/map_placeholder.gif" alt='flag' />
                        <div className='country-modal-infos-details'>
                            <div className='country-modal-infos-details-categs'>
                                <h1>Country Code</h1>
                                <h1>Population</h1>
                                <h1>User Data</h1>
                                <h1>Cities</h1>
                            </div>
                            <div className='country-modal-infos-details-values'>
                                <p>{geo.properties.iso_a2_eh}</p>
                                <p>{geo.properties.pop_est.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
                                <p>{data.count}</p>
                                <p>Cities</p>
                            </div>
                        </div>
                        <div className='country-modal-infos-download'>
                            <img src='https://cdn-icons-png.flaticon.com/512/992/992663.png' alt='download' />
                            <p>Download data</p>
                        </div>
                    </div>
                    <div className='country-modal-stats'>
                        <h1 className='country-modal-stats-title'>Latency Statistics</h1>
                        <img className='modal-map' src="https://user-images.githubusercontent.com/6562690/54934415-b4d25b80-4edb-11e9-8758-fb29ada50499.png" alt='flag' />
                        <img className='modal-map' src="https://user-images.githubusercontent.com/6562690/54934415-b4d25b80-4edb-11e9-8758-fb29ada50499.png" alt='flag' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryModal;