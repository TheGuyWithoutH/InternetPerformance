import React from "react";
import { scaleLinear } from "d3-scale";
import {
  Geographies,
  Geography
} from "react-simple-maps";
import "../../Assets/Styles/Components/WorldMap.css";

const geoUrl = "/custom.geo.json";

const colorScale = scaleLinear()
  .domain([0, 1000])
  .range(["#F5F4F6", "#AA63FF"]);

const World = (props) => {
  return (
    <Geographies geography={geoUrl}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const d = props.data[geo.properties.iso_a2.toLowerCase()];

          return (
            <Geography
            key={geo.rsmKey}
            geography={geo}
            onMouseEnter={() => {
                // props.changeHighlight({
                //   highlighted: geo.properties.name,
                //   hovered: true
                // });
              }}
            onMouseLeave={() => {
              // props.changeHighlight({
              //     highlighted: "World Map",
              //     hovered: false
              //   });
              }}
            fill={d ? colorScale(d.count) : "#F5F4F6"}
            style={{
              default: { outline: "none" },
              hover: { outline: "none", fill: "#306" },
              pressed: { outline: "none" },
            }} />
          );
        })
      }
    </Geographies>
  );
};

export default React.memo(World);
