import React, { useState } from 'react';
import {
    Geography
} from "react-simple-maps";
import CountryModal from './CountryModal';

const Country = ({ data, geo, changeHighlight, colorScale, setModal }) => {
    const [d, setD] = useState(data[geo.properties.iso_a2_eh.toLowerCase()]);

    useState(() => {
        if (d && d.count > 1000) {
            setD({ count: 1000 });
        } else if (!d || d.count < 100) {
            setD({ count: 100 });
        }
    }, [d]);

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
            onClick={() => {
                setModal(<CountryModal geo={geo} color={d ? colorScale(d.count) : "#F5F4F6"} setModal={setModal} data={data[geo.properties.iso_a2_eh.toLowerCase()] ?? {count: 0}} />);
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