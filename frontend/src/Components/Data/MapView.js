import React, {useState} from 'react';
import Map from './Map';
import "../../Assets/Styles/Components/WorldMap.css";

const MapView = () => {
    const [highlight, setHighlight] = useState({ highlighted: "World Map", hovered: false });
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