import React,{useState, useMemo} from 'react';
import IndiaDist from './IndiaDist';
import DemographMap from './Map';


const COLOR_RANGE = {
    initial: [
      "#605212",
      "#838A20",
      "#8AB231",
      "#87D645",
      "#B4DF5F",
      "#D9E77A",
      "#EEE896",
      "#F4E2B3",
      "#F9E5D1",
    ],
    maroon: [
      "#791D48",
      "#922547",
      "#AA2D42",
      "#C23638",
      "#D95540",
      "#DF6453",
      "#E47467",
      "#E9857B",
      "#EE978F",
      "#F2A9A3",
      "#F5BCB8",
    ],
    blue: [
      "#0A2F51",
      "#0E4D64",
      "#137177",
      "#188977",
      "#1D9A6C",
      "#39A96B",
      "#56B870",
      "#74C67A",
      "#99D492",
      "#BFE1B0",
      "#DEEDCF",
    ],
    green: [
      "#185500",
      "#0D6501",
      "#06750E",
      "#0C832B",
      "#148F4B",
      "#1D9A6C",
      "#56B67C",
      "#90D19B",
      "#CEEBCC",
    ],
  };

const LinearGradient = props => {

  const {gran} = props
  const { data } = props;
  const { stateName } = props
  console.log(stateName)
  const [colours, setColours] = useState(COLOR_RANGE["initial"]);
  console.log(colours)

  function changeColour(e) {
    const { value } = e.target;
    if(value === "maroon")
      setColours(COLOR_RANGE[value]);
    if(value === "blue")
      setColours(COLOR_RANGE[value]);
    if(value === "green")
      setColours(COLOR_RANGE[value]);
  };
  

  const maroonGradientData = useMemo(()=>{ 
    return {
    fromColor: COLOR_RANGE["maroon"][0],
    toColor: COLOR_RANGE["maroon"]["maroon".length-1],
  }
},[colours])
const greenGradientData = useMemo(()=>{ 
  return {
  fromColor: COLOR_RANGE["green"][0],
  toColor: COLOR_RANGE["green"]["green".length-1],
}
},[colours])
const blueGradientData = useMemo(()=>{
  return {
  fromColor: COLOR_RANGE["blue"][0],
  toColor: COLOR_RANGE["blue"]["blue".length-1],
}
},[colours])
  const boxStyle = {
    width: 180,
    margin: 'auto'
  };
  const maroonGradientStyle = {
    border: '2px solid #000000',
    backgroundImage: `linear-gradient(to right, ${maroonGradientData.fromColor} , ${maroonGradientData.toColor})`,
    height: 20

  };
  const greenGradientStyle = {
    border: '2px solid #000000',
    backgroundImage: `linear-gradient(to right, ${greenGradientData.fromColor} , ${greenGradientData.toColor})`,
    height: 20

  };
  const blueGradientStyle = {
    border: '2px solid #000000',
    backgroundImage: `linear-gradient(to right, ${blueGradientData.fromColor} , ${blueGradientData.toColor})`,
    height: 20

  };

  
  return (
    <div>
       <div>
        <input type="radio" id="maroon"  name="colors" value="maroon" onChange={changeColour} />
      <div style={{ ...boxStyle, ...maroonGradientStyle }} className="mt8"></div>
         
        <br />
          <input type="radio" id="blue" name="colors" value="blue" onChange={changeColour} />
        <div style={{ ...boxStyle, ...blueGradientStyle }} className="mt8"></div>
        <br />
        <input type="radio" id="green" name="colors" value="green" onChange={changeColour} />
          <div style={{ ...boxStyle, ...greenGradientStyle }} className="mt8"></div>
      </div>
      
      {stateName === "All India" ? (
            gran === "state" ? (
              
              <DemographMap colours={colours} />
            ) : (
              
              <IndiaDist data={data} stateName="India-Dist-sup" colours={colours} />
              
            )
          ) : (
            <div>
              <IndiaDist data={data} stateName={stateName} colours={colours} />
            </div>
          )}
      
      
    </div>
  );
};

export default LinearGradient;
