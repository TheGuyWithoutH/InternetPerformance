/**
 * @file World map component for displaying the world inside the map
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
  Geographies,
} from "react-simple-maps";
import { backendConfig } from "../../Services/config";
import "../../Assets/Styles/Components/WorldMap.css";
import Country from "./Country";

// Max value for the color scale
const maxValue = 500

// Set the color scale for the map
const colorScale = (value) => {
  if(value > maxValue) {
    value = maxValue
  }

  return scaleLinear()
  .domain([0, 500])
  .range(["#0CB4FB", "#933ECF"])(value)
}

const World = (props) => {
  const [worldData, setWorldData] = useState(null)

  // Fetch the world data from the backend if it is not already fetched
  useEffect(() => {
    if (!worldData) {
      fetch(backendConfig.url + ":" + backendConfig.port + "/api/search/world")
        .then(response => response.json())
        .then(data => {
          setWorldData(data);
          console.log("World fetched")
        });
    }
  }, [])

  if(worldData) {
    return (
      <Geographies geography={worldData}>
        {({ geographies }) =>
          geographies.map((geo) => 
            <Country key={geo.name + "-" + geo.country_code} geo={geo} changeHighlight={props.changeHighlight} colorScale={colorScale} setModal={props.setModal} />
          )
        }
      </Geographies>
    );
  } else {
    return null;
  }
};

export default React.memo(World);
