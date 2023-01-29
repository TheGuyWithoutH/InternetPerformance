/**
 * @file Main map component that displays the map of the world and the names of the country when the mouse is over it
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React, {useState} from 'react';
import Map from './Map';
import "../../Assets/Styles/Components/WorldMap.css";

const MapView = () => {
    // Highlighted country
    const [highlight, setHighlight] = useState({ highlighted: "World Map", hovered: false });

    // Modal to display when a country is clicked
    const [modal, setModal] = useState(null);

    return (
        <div  className="world-map">
            <Map changeHighlight={setHighlight} setModal={setModal}/>
            {<p className={highlight.hovered ? "highlight" : "highlight world-bold"}>{highlight.highlighted}</p>}
            {modal}
        </div>
    );
};

export default MapView;