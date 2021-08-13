import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import DisplayData from "./displayData1";

export default function Demographics() {
  const params = useParams();
  console.log(params);
  var { currentstate } = params;
  
  return (
    <div>
      <DisplayData state={currentstate} />
    </div>
  );
}
