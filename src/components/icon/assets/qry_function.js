import * as React from 'react';

const WuiIconQryFunction = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g>
      <path d="M13.072,7.883c-1.59,0-2.884-1.293-2.884-2.883s1.294-2.883,2.884-2.883S15.955,3.41,15.955,5S14.662,7.883,13.072,7.883z
        M13.072,2.686c-1.276,0-2.315,1.038-2.315,2.314s1.038,2.314,2.315,2.314S15.386,6.276,15.386,5S14.348,2.686,13.072,2.686z"/>
    </g>
    <polygon points="3.857,1.12 3.093,1.876 5.706,4.447 0.043,4.447 0.043,5.585 5.674,5.585 3.093,8.124 3.857,8.88 7.737,5 "/>
  </svg>
);

export const icon = WuiIconQryFunction;
