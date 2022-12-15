import React, { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import { geoMercator } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { backendConfig } from "../../Services/config";
import World from "./World";

const geoUrl = "/custom.geo.json";

const colorScale = scaleLinear()
  .domain([100, 1000])
  .range(["#F5F4F6", "#AA63FF"]);

const Map = ({changeHighlight, setModal}) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      fetch(backendConfig.url + ":" + backendConfig.port + "/api/query/world")
        .then(response => response.json())
        .then(data => {
          setData(data);
        });
    }
  }, []);

  const projection = geoMercator()

  function handleMoveEnd(position) {
    console.log(position);
    if (position.coordinates[1] > -55 && position.coordinates[1] < 83 && position.coordinates[0] > -156 && position.coordinates[0] < 175) {
      setPosition(position);
    }
  }


  return (
    <div className="map">
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
          {data && (<World data={data} changeHighlight={changeHighlight} setModal={setModal} />)}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default React.memo(Map);
