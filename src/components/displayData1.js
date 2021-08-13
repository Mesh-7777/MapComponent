import React, { useEffect, useState } from "react";
import Map from "./Map";
import { Link } from "react-router-dom";

import IndiaDist from "./IndiaDist";
import "./../style/display.css";

// const url = "https://elastic.airesearch.in/demographics_v2_testing_mapping/_search";

export default function DisplayData({state}) {
 
  const [statedataforvariable, setStatedataforvariable] = useState();
  const [year, setYear] = useState(2012);
  const [mapdata, setMapdata] = useState({});
  const [granularity, setGranularity] = useState("state");

  const loadMapData = (statesdata) => {
    // var mapdata = {}
    Object.keys(statesdata).map((state) => {
      mapdata[state] = statesdata[state];
    });
    setMapdata(statesdata);
  };

  return (
    <>
      <div className="display_d">
        <div className="d2">
          {/* {!data ? "" :
            <select className="year" onChange={(e) => { setYear(e.target.value) }} >
              {Object.keys(data).map((year) => {
                return (<option value={year}>{year}</option>)
              })}
            </select>} */}
          {state === "All India" ? (
            <div className="granular">
              <span>
                <input
                  type="radio"
                  checked={granularity === "state"}
                  onChange={() => setGranularity("state")}
                />
                State wise
              </span>
              <span>
                <input
                  type="radio"
                  checked={granularity === "district"}
                  onChange={() => setGranularity("district")}
                />
                District wise
              </span>
            </div>
          ) : null}
          {state === "All India" ? (
            granularity === "state" ? (
              <Map data={mapdata} />
            ) : (
              <IndiaDist data={mapdata} statename="India-Dist-sup" />
            )
          ) : (
            <div>
              <IndiaDist data={mapdata} statename={state} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
