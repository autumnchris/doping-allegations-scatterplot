import React from 'react';

const Tooltip = ({ tooltip }) => {
  return <div className="tooltip" style={{ top: tooltip.top, left: tooltip.left }}><strong>{tooltip.name}, {tooltip.nationality}</strong><br /><strong>Year:</strong> {tooltip.year}<br /><strong>Time:</strong> {tooltip.time}<br />{tooltip.allegation ? tooltip.allegation : 'No doping allegations'}</div>;
}

export default Tooltip;