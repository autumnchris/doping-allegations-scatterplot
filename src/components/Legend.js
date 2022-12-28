import React from 'react';

const Legend = () => {
  const legendData = [
    {
      allegation: true,
      color: '#e18484'
    },
    {
      allegation: false,
      color: '#4ddbff'
    }
  ];

  return <g className="legend" transform="translate(-10, 40)">{legendData.map((legendItem, i) => {
    return <React.Fragment key={i}>
      <rect className="legend-color" x="120" y={i * 24 - 12} width="30" height="15" fill={legendItem.color} stroke="hsl(0, 0%, 20%)"></rect>
      <text className="legend-label" x="160" y={i * 24} fill="hsl(0, 0%, 100%)" style={{ fontSize: "0.7rem" }}>{legendItem.allegation ? 'Doping Allegations' : 'No Doping Allegations'}</text>
    </React.Fragment>
  })}</g>;
}

export default Legend;