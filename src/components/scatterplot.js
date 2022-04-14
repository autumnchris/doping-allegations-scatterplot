import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import LoadingSpinner from './loading-spinner';
import ErrorMessage from './error-message';

const Scatterplot = () => {
  const margin = {
    top: 50,
    right: 40,
    bottom: 120,
    left: 110
  };
  const w = 800;
  const h = w * 0.6;
  const legendData = [
    {
      doping: true,
      color: '#e18484'
    },
    {
      doping: false,
      color: '#4ddbff'
    }
  ];

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);

  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(dataset => {
      setLoadingStatus(false);
      setLoadSuccess(true);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, (d) => d.Year))
        .range([margin.left, w - margin.right]);
      const yScale = d3.scaleTime()
        .domain([d3.max(dataset, (d) => d3.timeParse('%M:%S')(d.Time)), d3.min(dataset, (d) => d3.timeParse('%M:%S')(d.Time))])
        .range([h - margin.top, margin.bottom]);

      d3.select('.legend').selectAll('rect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('class', 'legend-color')
        .attr('x', 120)
        .attr('y', (d, i) => i * 24 - 12)
        .attr('width', 30)
        .attr('height', 15)
        .attr('fill', (d) => d.color)
        .attr('stroke', 'hsl(0, 0%, 20%)');
      
      d3.select('.legend').selectAll('text')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class', 'legend-label')
        .attr('x', 160)
        .attr('y', (d, i) => i * 24)
        .attr('fill', 'hsl(0, 0%, 100%)')
        .text(d => d.doping ? 'Doping Allegations' : 'No Doping Allegations')
        .style('font-size', '0.7rem');
      
      d3.select('.x-axis')
        .call(d3.axisBottom(xScale)
        .tickFormat((d) => d));
      
      d3.select('.y-axis')
        .call(d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%M:%S')));

      d3.select('.scatterplot').selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 5)
        .attr('cx', (d) => xScale(d.Year))
        .attr('cy', (d) => yScale(d3.timeParse('%M:%S')(d.Time)))
        .attr('fill', d => d.Doping ? '#e18484' : '#4ddbff')
        .attr('stroke', 'hsl(0, 0%, 20%)')
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);
    }).catch(() => {
      setLoadingStatus(false);
      setLoadSuccess(false);
    });
  }, []);

  function handleMouseover(event, d) {
    const tooltip = d3.select('.graph-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden');

    d3.select(event.currentTarget)
      .attr('r', 8);

    tooltip.transition()
      .duration(200)
      .style('visibility', 'visible');

    tooltip.html(`${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping ? d.Doping : 'No doping allegations'}`)
      .style('left', `${(event.pageX - 50)}px`)
      .style('top', `${(event.pageY - 100)}px`);
  }

  function handleMouseout(event) {
    d3.select(event.currentTarget)
      .attr('r', 5);

    d3.select('.tooltip').remove();
  }

  return (
    <div className="graph-container">
      {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <svg className="scatterplot" viewBox={`0 0 ${w} ${h}`}>
        <g className="legend" transform="translate(-10, 40)"></g>
        <g className="x-axis" transform={`translate(0, ${h - margin.top})`} style={{ fontFamily: "'Noto Sans', sans-serif" }}></g>
        <g className="y-axis" transform={`translate(${margin.left}, 0)`} style={{fontFamily: "'Noto Sans', sans-serif"}}></g>
        <text className="y-label" x="-290" y="40" transform="rotate(-90)">Completion Time (MM:SS)</text>
      </svg> : <ErrorMessage />}
    </div>
  );
}

export default Scatterplot;