import React, { useState, useEffect } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { select, scaleLinear } from "d3";
import * as d3 from "d3";
import { Db2 } from "./Db2";

const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

var jsondata = {
  India: { path: "/india.json", main_name: "india", name: "India" },
  "India-Dist": {
    path: "/india-districts.json",
    main_name: "IND_adm2",
    name: "India-Dist",
  },
  "India-Dist-sup": {
    path: "/indiadist-sup.json",
    main_name: "India-dist",
    name: "India-Dist",
    x: "-2700",
    y: "1630",
    z: "2300",
  },
  Maharashtra: {
    path: "/maharashtra.json",
    main_name: "maharashtra_district",
    name: "Maharashtra",
    x: "-3000",
    y: "1000",
    z: "2450",
  },
  Gujarat: {
    path: "/gujarat.json",
    main_name: "gujarat_district",
    name: "Gujarat",
    x: "-2850",
    y: "1150",
    z: "2450",
  },
  Delhi: {
    path: "/delhi.json",
    main_name: "delhi_district",
    name: "Delhi",
    x: "-8800",
    y: "4200",
    z: "7350",
  },
  "Madhya Pradesh": {
    path: "/madhyapradesh.json",
    main_name: "madhyapradesh_district",
    name: "Madhya Pradesh",
    x: "-3100",
    y: "1250",
    z: "2450",
  },
  "Tamil Nadu": {
    path: "/tamilnadu.json",
    main_name: "tamilnadu_district",
    name: "Tamilnadu",
    x: "-3200",
    y: "700",
    z: "2450",
  },
  "Uttar Pradesh": {
    path: "/uttarpradesh.json",
    main_name: "uttarpradesh_district",
    name: "Uttar Pradesh",
    x: "-3200",
    y: "1400",
    z: "2450",
  },
  "Andhra Pradesh": {
    path: "/andhrapradesh.json",
    main_name: "andhrapradesh_district",
    name: "Andhra Pradesh",
    x: "-3200",
    y: "900",
    z: "2450",
  },
  "Arunachal Pradesh": {
    path: "/arunachalpradesh.json",
    main_name: "arunachalpradesh_district",
    name: "Arunachal Pradesh",
    x: "-3800",
    y: "1380",
    z: "2450",
  },
  Assam: {
    path: "/assam.json",
    main_name: "assam_district",
    name: "Assam",
    x: "-3750",
    y: "1300",
    z: "2450",
  },
  Bihar: {
    path: "/bihar.json",
    main_name: "bihar_district",
    name: "Bihar",
    x: "-3450",
    y: "1350",
    z: "2450",
  },
  Rajasthan: {
    path: "/rajasthan.json",
    main_name: "rajasthan_district",
    name: "Rajasthan",
    x: "-2900",
    y: "1400",
    z: "2450",
  },
  "Dadra & Nagar Haveli": {
    path: "/dadranagarhaveli.json",
    main_name: "dadranagarhaveli_district",
    name: "Dadra & Nagar Haveli",
    x: "-3000",
    y: "1000",
    z: "2450",
  },
  "Daman & Diu": {
    path: "/dnh-and-dd.json",
    main_name: "dnh-and-dd",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    x: "-2950",
    y: "1000",
    z: "2450",
  },
  Goa: {
    path: "/goa.json",
    main_name: "goa_district",
    name: "Goa",
    x: "-3020",
    y: "780",
    z: "2450",
  },
  Haryana: {
    path: "/haryana.json",
    main_name: "haryana_district",
    name: "Haryana",
    x: "-3100",
    y: "1450",
    z: "2450",
  },
  "Himachal Pradesh": {
    path: "/himachalpradesh.json",
    main_name: "himachalpradesh_district",
    name: "Himachal Pradesh",
    x: "-3150",
    y: "1600",
    z: "2450",
  },
  "Jammu And Kashmir": {
    path: "/jammukashmir.json",
    main_name: "jammukashmir_district",
    name: "Jammu And Kashmir",
    x: "-3100",
    y: "1650",
    z: "2450",
  },
  Jharkhand: {
    path: "/jharkhand.json",
    main_name: "jharkhand_district",
    name: "Jharkhand",
    x: "-3480",
    y: "1200",
    z: "2450",
  },
  Karnataka: {
    path: "/karnataka.json",
    main_name: "karnataka_district",
    name: "Karnataka",
    x: "-3100",
    y: "850",
    z: "2450",
  },
  Kerala: {
    path: "/kerala.json",
    main_name: "kerala_district",
    name: "Kerala",
    x: "-3100",
    y: "620",
    z: "2450",
  },
  Ladakh: {
    path: "/ladakh.json",
    main_name: "ladakh_district",
    name: "Ladakh",
    x: "-3150",
    y: "950",
    z: "2450",
  },
  Lakshadweep: {
    path: "/lakshadweep.json",
    main_name: "lakshadweep_district",
    name: "Lakshadweep",
    x: "-2950",
    y: "570",
    z: "2450",
  },
  Manipur: {
    path: "/manipur.json",
    main_name: "manipur_district",
    name: "Manipur",
    x: "-3850",
    y: "1200",
    z: "2450",
  },
  Meghalaya: {
    path: "/meghalaya.json",
    main_name: "meghalaya_district",
    name: "Meghalaya",
    x: "-3750",
    y: "1200",
    z: "2450",
  },
  Mizoram: {
    path: "/mizoram.json",
    main_name: "mizoram_district",
    name: "Mizoram",
    x: "-3850",
    y: "1150",
    z: "2450",
  },
  Nagaland: {
    path: "/nagaland.json",
    main_name: "nagaland_district",
    name: "Nagaland",
    x: "-3850",
    y: "1250",
    z: "2450",
  },
  Odisha: {
    path: "/odisha.json",
    main_name: "odisha_district",
    name: "Odisha",
    x: "-3400",
    y: "1050",
    z: "2450",
  },
  Puducherry: {
    path: "/puducherry.json",
    main_name: "puducherry_district",
    name: "Puducherry",
    x: "-3150",
    y: "750",
    z: "2450",
  },
  Punjab: {
    path: "/punjab.json",
    main_name: "punjab_district",
    name: "Punjab",
    x: "-3050",
    y: "1550",
    z: "2450",
  },
  Sikkim: {
    path: "/sikkim.json",
    main_name: "sikkim_district",
    name: "Sikkim",
    x: "-3650",
    y: "1350",
    z: "2450",
  },
  Tripura: {
    path: "/tripura.json",
    main_name: "tripura_district",
    name: "Tripura",
    x: "-3800",
    y: "1150",
    z: "2450",
  },
  Uttarakhand: {
    path: "/uttarakhand.json",
    main_name: "uttarakhand_district",
    name: "Uttarakhand",
    x: "-3200",
    y: "1500",
    z: "2450",
  },
  Uttarpradesh: {
    path: "/uttarpradesh.json",
    main_name: "uttarpradesh_district",
    name: "Uttarpradesh",
    x: "-3150",
    y: "950",
    z: "2450",
  },
  "West Bengal": {
    path: "/westbengal.json",
    main_name: "westbengal_district",
    name: "West Bengal",
    x: "-3600",
    y: "1250",
    z: "2450",
  },
  Chhattisgarh: {
    path: "/chhattisgarh.json",
    main_name: "chhattisgarh_district",
    name: "Chhattisgarh",
    x: "-3350",
    y: "1100",
    z: "2450",
  },
  "Andaman And Nicobar": {
    path: "/andamannicobarislands.json",
    main_name: "andamannicobarislands_district",
    name: "Andaman And Nicobar",
    x: "-3850",
    y: "650",
    z: "2450",
  },
};

function IndiaDist({ statename }) {
  console.log(statename);
  console.log(jsondata);
  
  const data = Db2
  const projection = d3
    .geoMercator()
    .scale(jsondata[statename]["z"])
    .translate([jsondata[statename]["x"], jsondata[statename]["y"]]);
  const [topojson, settopojson] = useState({});

  const [geographies, setGeographies] = useState([]);

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: geographies.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };
console.log(geographies);
  useEffect(() => {
    settopojson(jsondata[statename]);
  }, [data]);

  useEffect(() => {
    if (topojson) {
      fetch(topojson["path"]).then((response) => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`);
          return;
        }
        response.json().then((worlddata) => {
          console.log(worlddata);
          console.log(topojson.main_name);
          var main_name = topojson["main_name"];

          let x = feature(worlddata, worlddata.objects[main_name]).features;
          setGeographies(x);
        });
      });
    }
  }, [topojson]);
console.log(geographies)
  useEffect(() => {
    if (data) {
      // var cmin = 10000000,
      //   cmax = 0;

      // for (let i in data) {
      //   if(i!="Total"){
      //     if(data[i] < cmin)
      //      cmin=data[statename][i];
      //      if(data[i]>cmax){
      //        cmax=data[i]
      //      }
      //   }
      // }

      var colorScale = scaleLinear()
        .domain([100000000, 0])
        //geographies.map((geo)=>{geo})
        .range(["#D4EEFF", "#0099FF"]);

      var svg = select(".mapsvg");

      svg.selectAll("*").remove();
      var toptext = svg.append("text").attr("x", 200).attr("y", 30);
      var states = svg.selectAll(".countries").data(geographies).enter();
      // filters go in defs element
      var defs = svg.append("defs");

      // create filter with id #drop-shadow
      // height=130% so that the shadow is not clipped
      // var filter = defs
      //   .append("filter")
      //   .attr("id", "drop-shadow")
      //   .attr("height", "130%");

      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      // filter
      //   .append("feGaussianBlur")
      //   .attr("in", "SourceAlpha")
      //   .attr("stdDeviation", 5)
      //   .attr("result", "blur");

      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      // filter
      //   .append("feOffset")
      //   .attr("in", "blur")
      //   .attr("dx", 5)
      //   .attr("dy", 5)
      //   .attr("result", "offsetBlur");

      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
      // var feMerge = filter.append("feMerge");

      // feMerge.append("feMergeNode").attr("in", "offsetBlur");
      // feMerge.append("feMergeNode").attr("in", "SourceGraphic");
      var mState = states
        .append("path")
        .attr("d", (d, i) => {
          return geoPath().projection(projection)(d);
        })
        .attr("fill", (d, i) => {
          var mDistrict = d.properties.distname;
          var state = d.properties.statename;
          if (data[state] && data[mDistrict] ) var ref = data[state][mDistrict];
          if (typeof ref === "undefined") {
            return colorScale(0);
          }

          return colorScale(ref);
        })
        // .style("filter", "url(#drop-shadow)")
        .attr("stroke", " black");

     

        var tooltip = svg.append("g");
        var bg = tooltip.append("rect");
  
        var txt = tooltip.append("text").attr("x", 30).attr("y", 70);
      mState.attr("class", (d, i) => { return "mystate" + i});

      mState
        .on("mouseover", (d, i, e) => {
          bg.attr("x",250).attr("y",40).attr("width",320).attr("height",40).attr("fill","lightsteelblue")
          var mstate = d.properties.distname;
          var state = d.properties.statename;
          select(".mapsvg").selectAll(".mystate"+i).attr("fill","#00c3ff")
          txt.text(mstate + " : " + data[mstate]);
          return tooltip.style("visibility", "visible");
        })
        .on("mouseout", (d, i, e) => {
          // var dist = d.properties.district;
          // select(".mapsvg").selectAll(".mystate"+i).attr("fill",(d)=>{
          //   var mDistrict = d.properties.distname;
          //   var state = d.properties.statename;
          //   console.log(mDistrict,state);
          // //   if(data[state] != 'undefined')
          // //   {
          // //   var ref = data[state][mDistrict];
          // //   console.log(ref);
          // //   // if(typeof(ref)==="undefined")
          // //   // {return colorScale(0)}

          // //    return colorScale(ref)
          // // }})
          // })
          return tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function (d) {
          if (statename === "India-Dist-sup") {
            var dist = d.properties.district;
            var val = "no data";

            val = data[dist];
            // txt.text(dist + ":" + val);
            bg.attr("x", 50)
              .attr("y", 70)
              .attr("width", 600)
              .attr("height", 70)
              .attr("fill", "lightsteelblue");
            txt
              .attr("x", 50)
              .attr("y", 130)
              .attr("font-size", "65px")
              .attr("font-weight", "700");
          } else {
            var dist = d.properties.district;
            var val = "no data";

            val = data[dist];
            // txt.text(dist + ":" + val);
            bg.attr("x", 50)
              .attr("y", 70)
              .attr("width", 200)
              .attr("height", 30)
              .attr("fill", "lightsteelblue");
            txt
              .attr("x", 50)
              .attr("y", 92.5)
              .attr("font-size", "20px")
              .attr("font-weight", "700");
          }
        })
        .on("click", (d) => {
          console.log("clickedd"+ d.properties.distname);
        });
    }
  }, [geographies, topojson]);

  return (
    <div>
      {statename !== "India-Dist-sup" ? (
        <svg
          viewBox="10 10 450 450"
          className="mapsvg"
          width={"35vw"}
          filter="url(#f1)"
          height={"75vh"}
          style={{ backgroundColor: "white" }}
        >
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g className="countries"> </g>
        </svg>
      ) : (
        <svg
          viewBox="10 10 1350 1350"
          className="mapsvg"
          width={"35vw"}
          filter="url(#f1)"
          height={"75vh"}
          style={{ backgroundColor: "white" }}
        >
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g className="countries"> </g>
        </svg>
      )}
    </div>
  );
}

export default IndiaDist;
