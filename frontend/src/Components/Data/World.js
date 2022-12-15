import React from "react";
import { scaleLinear } from "d3-scale";
import {
  Geographies,
} from "react-simple-maps";
import "../../Assets/Styles/Components/WorldMap.css";
import Country from "./Country";

const geoUrl = "/custom.geo.json";

const colorScale = scaleLinear()
  .domain([0, 1000])
  .range(["#0CB4FB", "#933ECF"]);

const World = (props) => {
  return (
    <Geographies geography={geoUrl}>
      {({ geographies }) =>
        geographies.map((geo) => 
          <Country data={props.data} geo={geo} changeHighlight={props.changeHighlight} colorScale={colorScale} setModal={props.setModal} />
        )
      }
    </Geographies>
  );
};

export default React.memo(World);
