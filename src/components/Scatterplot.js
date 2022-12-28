import React from 'react';
import { scaleLinear, scaleTime, extent, max, min, timeParse } from 'd3';
import Legend from './Legend';
import Axis from './Axis';
import Dot from './Dot';

const Scatterplot = ({ dopingData, handleMouseEnter, handleMouseLeave }) => {
  const margin = {
    top: 50,
    right: 40,
    bottom: 120,
    left: 110
  };
  const w = 800;
  const h = w * 0.6;
  const xScale = scaleLinear()
    .domain(extent(dopingData, (d) => d.Year))
    .range([margin.left, w - margin.right]);
  const yScale = scaleTime()
    .domain([max(dopingData, (d) => timeParse('%M:%S')(d.Time)), min(dopingData, (d) => timeParse('%M:%S')(d.Time))])
    .range([h - margin.top, margin.bottom]);

  return (
    <div className="graph-container">
      <svg className="scatterplot" viewBox={`0 0 ${w} ${h}`}>
        <Legend />
        <Axis className="x-axis" transform={`translate(0, ${h - margin.top})`} scale={xScale} />
        <Axis className="y-axis" transform={`translate(${margin.left}, 0)`} scale={yScale} />
        <text className="y-label" x="-290" y="40" transform="rotate(-90)">Completion Time (MM:SS)</text>
        {dopingData.map((dot, i) => <Dot key= {i} dot={dot} cx={xScale(dot.Year)} cy={yScale(timeParse('%M:%S')(dot.Time))} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)}
      </svg>
    </div>
  );
}

export default Scatterplot;
