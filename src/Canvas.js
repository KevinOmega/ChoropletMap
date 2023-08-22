import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./canvas.css";
import * as topojson from "topojson";

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
      let minValue = 2.56;
      let maxValue = 75.1;
      let steps = 8;

      const color = d3
        .scaleThreshold()
        .domain(d3.range(minValue, maxValue, (maxValue - minValue) / steps))
        .range(d3.schemeGreens[9]);

      const path = d3.geoPath();

      const x = d3.scaleLinear().domain([minValue, maxValue]).range([600, 860]);

      const svg = d3
        .select("#canvas-container")
        .append("svg")
        .attr("id", "svg")
        .attr("width", "70%")
        .attr("height", "100%");

      const g = svg
        .append("g")
        .attr("id", "legend")
        .attr("class", "ticks")
        .attr("transform", "translate(0, 30)");

      g.selectAll("rect")
        .data(
          color.range().map((d) => {
            d = color.invertExtent(d);
            if (d[0] === null) {
              d[0] = x.domain()[0];
            }
            if (d[1] === null) {
              d[1] = x.domain()[1];
            }
            return d;
          })
        )
        .enter()
        .append("rect")
        .attr("fill", (d) => color(d[0]))
        .attr("x", (d) => x(d[0]))
        .attr("width", (d) => (d[0] && d[1] ? x(d[1]) - x([d[0]]) : x(null)))
        .attr("height", 8);

      g.call(
        d3
          .axisBottom(x)
          .tickSize(10)
          .tickFormat((x) => Math.round(x) + "%")
          .tickValues(color.domain())
      )
        .select(".domain")
        .remove();

      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states))
        .attr("class", "states")
        .attr("d", path);

      svg
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("fill", (d) => {
          return color(
            educationalData.filter((data) => data.fips === d.id)[0]
              .bachelorsOrHigher
          );
        })
        .attr("d", path);
    }
  }, [us, educationalData]);

  return <div id="canvas-container"></div>;
};

export default Canvas;
