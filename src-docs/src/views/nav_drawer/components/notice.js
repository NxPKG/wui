import React from 'react';
import { WuiBeacon } from '../../../../../src/components';

export default ({ children, top = 0, right = 0, active = false }) => (
  <span style={{ display: 'inline-block', position: 'relative' }}>
    {active ? (
      <WuiBeacon
        size={5}
        style={{ position: 'absolute', top: `${top}%`, right: `${right}%` }}
      />
    ) : (
      <></>
    )}
    {children}
  </span>
);
