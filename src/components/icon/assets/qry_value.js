import * as React from 'react';

const WuiIconQryValue = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g>
      <path d="M3.05,9.52L0.04,0.529h1.155L3.812,8.34l2.641-7.812h1.155L4.599,9.52H3.05z"/>
    </g>
    <g>
      <g fillOpacity="0.75">
        <path d="M12.998,0.497c1.6,0,2.901,1.301,2.901,2.901s-1.301,2.901-2.901,2.901s-2.901-1.301-2.901-2.901
          S11.399,0.497,12.998,0.497z M12.998,5.727c1.284,0,2.328-1.045,2.328-2.329s-1.044-2.329-2.328-2.329S10.67,2.114,10.67,3.398
          S11.714,5.727,12.998,5.727z"/>
      </g>
      <circle cx="13.035" cy="6.559" r="2.944"/>
    </g>
  </svg>
);

export const icon = WuiIconQryValue;
