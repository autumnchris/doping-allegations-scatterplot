import React, { useEffect } from 'react';
import { select, axisBottom, axisLeft, timeFormat } from 'd3';

const Axis = ({ className, transform, scale }) => {

  useEffect(() => {
    let angle;
    let axis;

    if (className === 'x-axis') {
      angle = axisBottom(scale);
      axis = angle.tickFormat((d) => d);
    }
    else if (className === 'y-axis') {
      angle = axisLeft(scale);
      axis = angle.tickFormat(timeFormat('%M:%S'));
    }

    select(`.${className}`)
      .call(axis);
  }, [scale]);

  return <g className={className} transform={transform} style={{ fontFamily: "'Noto Sans', sans-serif" }}></g>;
}

export default Axis;