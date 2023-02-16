/**
 * @file Map component for the map of the data
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React, { useState } from "react";
import { geoMercator } from "d3-geo";
import {
  ComposableMap,
  ZoomableGroup
} from "react-simple-maps";
import World from "./World";


const Map = ({changeHighlight, setModal}) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const projection = geoMercator()


  // handleMoveEnd is used to prevent the user from moving the map outside the world
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
          <World changeHighlight={changeHighlight} setModal={setModal} />
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default React.memo(Map);
