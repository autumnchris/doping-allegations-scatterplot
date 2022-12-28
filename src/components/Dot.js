import React from 'react';

const Dot = ({ dot, cx, cy, handleMouseEnter, handleMouseLeave }) => {
  return <circle className="dot" r="5" cx={cx} cy={cy} fill={dot.Doping ? '#e18484' : '#4ddbff'} stroke="hsl(0, 0%, 20%)" onMouseEnter={event => handleMouseEnter(event, dot)} onMouseLeave={event => handleMouseLeave(event)}></circle>;
}

export default Dot;