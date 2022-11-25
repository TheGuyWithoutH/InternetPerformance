import React, {useState} from 'react';
import Map from './Map';
import "../../Assets/Styles/Components/WorldMap.css";

const MapView = () => {
    const [highlight, setHighlight] = useState({ highlighted: "World Map", hovered: false });

    return (
        <div  className="world-map">
            <Map changeHighlight={setHighlight}/>
            {<p className={highlight.hovered ? "highlight" : "highlight world-bold"}>{highlight.highlighted}</p>}
        </div>
    );
};

export default MapView;