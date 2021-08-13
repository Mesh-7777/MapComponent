import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import {select,scaleLinear}  from "d3"
import * as d3 from 'd3'
import {Db2} from './Db2'

import _ from 'lodash';



export default function DemographMap(){

    const data = Db2
    const [geographies, setGeographies] = useState([])   
          let w = -1120;     
    useEffect(() =>
     {
        fetch("/india.json")
          .then(response => {
            if (response.status !== 200) {
              console.log(`There was a problem: ${response.status}`)
              return
            }
            
            response.json().then(worlddata => {
              let x = feature(worlddata, worlddata.objects.india).features
              setGeographies(x)
              console.log(geographies);
            })
            
          })
        }, [data])


        useEffect(() => {   
            var cmin=10000000,cmax=0;      
            for(let state in data)
            {
                if(data[state]!=undefined)
                {
                  var value = parseFloat(data[state])      
                  if(state!="ALL INDIA")
                  {
                     if(value < cmin)
                       {cmin=value;}
                     if(value>cmax)
                       {cmax=value}
                  }
                }
              
            }      
            console.log(geographies);
            // if(Db.state === geographies.properties.st_nm){
            //   console.log(true);
            // }
            
            const  colorScale= scaleLinear()
                    .domain([70000, 1000])
                    .range(["#00c3ff", "#1aa3d9"]);

            const projection  = d3.geoMercator()
              .scale(1000)
              .translate([w,720]);
                                  

            const pathGenerator = d3.geoPath().projection(projection);

           const svg = select(".mapsvg");

           const states = svg
                .selectAll(".countries")
                .data(geographies)
                .join("path")            
                .attr("fill",(d,i)=>{ 
                        var place = d.properties.st_nm
                        var val  ;
                        var ref = data[place];
                       
                        if(!ref)
                         {
                       
                             return colorScale(0)
                         }
                        val = parseInt(data[place])
           
                        return colorScale(val)
                        } )
              .attr("d",(d,i)=>pathGenerator(d))
              .attr("stroke","#101010")
              .attr("stroke-width","0.8");

               var tooltip =svg.append("g")

                      var bg =tooltip.append("rect")
                      
              
                       
                      var txt=tooltip.append("text").attr("x",250).attr("y",70).attr("font-weight","700").attr("font-size","25px")
      
                      states.attr("class",(d,i)=>{ return "mystate"+i})
      
                      states.on("mouseover",(d,i,e)=>
                      {        
                        bg.attr("x",250).attr("y",40)
                        .attr("width",320).attr("height",40).attr("fill","lightsteelblue")                 
                        var place = d.properties.st_nm
                        // const val = d.properties.value
                        select(".mapsvg").selectAll(".mystate"+i).attr("fill","#00c3ff")
                        txt.text(place + " : " + data[place])
                        return tooltip.style("visibility", "visible");
                      })                       
                       .on("mouseout",(d,i,e)=>{                   
                        select(".mapsvg").selectAll(".mystate"+i).attr("fill",(d)=>{
                        var place = d.properties.st_nm
                        var val;
                        var ref = data[place];
                        if(!ref)
                         return colorScale(0)
                        val = parseInt(data[place])
                        return colorScale(val)
                        })
                        return tooltip.style("visibility", "hidden");
                      })

          },[geographies])


    return(
      <svg className="mapsvg" width={'35vw'} viewBox='30 -30 600 650' height={ '75vh' }  >
 </svg>
    )
}