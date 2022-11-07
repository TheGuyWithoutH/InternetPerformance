import React, { useEffect, useRef, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {geoMercator} from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import "../../Assets/Styles/Components/WorldMap.css";

const geoUrl = "/custom.geo.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const WorldMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const projection = geoMercator()

  function handleMoveEnd(position) {
    if(position.coordinates[1] > -55 && position.coordinates[1] < 83 && position.coordinates[0] > -156 && position.coordinates[0] < 175) {
      setPosition(position);
    }
  }

  return (
    <ComposableMap
      projection={projection}
      className="map"
    >
      <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        translateExtent={[[-100, -200], [1100, 500]]}
        onMoveEnd={handleMoveEnd}
      >
        {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={"#F5F4F6"}
                  style={{
                    default: { outline: "none" },
                    hover: {outline: "none", fill: "#02A" },
                    pressed: { outline: "none" },
                  }}/>
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default WorldMap;
