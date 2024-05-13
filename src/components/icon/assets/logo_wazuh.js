import * as React from 'react';

const WuiIconLogoWazuh = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 203 121"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M117.4 81.4L92.4.1H72.6l-25 81.3L22.7 0H0l36.2 118.7h18.5l27.8-85.9 27.7 85.9h18.4L164.8.1h-22.6l-24.8 81.3z"
      className="wuiLogoFill"
    />
    <path
      d="M183.6 121c10.328 0 18.7-8.372 18.7-18.7s-8.372-18.7-18.7-18.7-18.7 8.372-18.7 18.7 8.372 18.7 18.7 18.7z"
      className="wuiLogoSecondaryFill"
    />
  </svg>
);

export const icon = WuiIconLogoWazuh;
