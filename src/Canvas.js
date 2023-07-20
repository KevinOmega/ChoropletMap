import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const Canvas = () => {
  const [us, setUs] = useState({});
  const [educationalData, setEducationalData] = useState([]);

  useEffect(() => {
    Promise.all([
      d3.json(
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
      ),
      d3.json(
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
      ),
    ]).then((data) => {
      setUs(data[1]);
      setEducationalData(data[0]);
    });
  }, []);

  useEffect(() => {
    if (us !== {} && educationalData.length) {
      console.log(us);
      console.log(educationalData);
    }
  }, [us, educationalData]);

  return <div id="canvas-container"></div>;
};

export default Canvas;
