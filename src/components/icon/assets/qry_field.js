import * as React from 'react';

const WuiIconQryField = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g>
      <g>
        <g fillOpacity="0.75">
          <path d="M13.072,9.503c-1.6,0-2.901-1.301-2.901-2.901s1.301-2.901,2.901-2.901s2.901,1.301,2.901,2.901
            S14.671,9.503,13.072,9.503z M13.072,4.273c-1.284,0-2.328,1.045-2.328,2.329s1.044,2.329,2.328,2.329S15.4,7.886,15.4,6.602
            S14.356,4.273,13.072,4.273z"/>
        </g>
        <circle cx="13.035" cy="3.441" r="2.944"/>
      </g>
      <g>
        <path d="M0.052,9.489V0.497h5.245v1.111H1.163v2.829h3.384v1.111H1.163v3.94H0.052V9.489z"/>
      </g>
    </g>
  </svg>
);

export const icon = WuiIconQryField;
