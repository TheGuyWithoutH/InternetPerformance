/**
 * @file Country component for the map
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React from 'react';
import {
    Geography
} from "react-simple-maps";
import CountryModal from './CountryModal';

const Country = ({ geo, changeHighlight, colorScale, setModal }) => {

    return (
        <Geography
            key={geo.rsmKey}
            geography={geo}
            onMouseEnter={() => {
                changeHighlight({
                    highlighted: geo.name,
                    hovered: true
                });
            }}
            onMouseLeave={() => {
                changeHighlight({
                    highlighted: "World Map",
                    hovered: false
                });
            }}
            onClick={() => {
                setModal(<CountryModal geo={geo} color={colorScale(geo.stats.user_count)} setModal={setModal} />);
            }}
            fill={colorScale(geo.stats.user_count)}
            style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "#306" },
                pressed: { outline: "none" },
            }} />
    );
};

export default React.memo(Country);