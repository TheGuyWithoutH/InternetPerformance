import React, { useState} from 'react';
import {
    Geography
  } from "react-simple-maps";

const Country = ({data, geo, changeHighlight, colorScale}) => {
    const [d, setD] = useState(data[geo.properties.iso_a2.toLowerCase()]);

    return (
        <Geography
            key={geo.rsmKey}
            geography={geo}
            onMouseEnter={() => {
                changeHighlight({
                    highlighted: geo.properties.name,
                    hovered: true
                });
            }}
            onMouseLeave={() => {
                changeHighlight({
                    highlighted: "World Map",
                    hovered: false
                  });
            }}
            fill={d ? colorScale(d.count) : "#F5F4F6"}
            style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "#306" },
                pressed: { outline: "none" },
            }} />
    );
};

export default React.memo(Country);