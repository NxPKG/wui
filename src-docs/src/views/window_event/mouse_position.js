import React, { useState } from 'react';

import {
  WuiSwitch,
  WuiDescriptionList,
  WuiSpacer,
} from '../../../../src/components';

import { WuiWindowEvent } from '../../../../src/services';

export const MousePosition = () => {
  const [tracking, setTracking] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const onSwitchChange = () => {
    setTracking(!tracking);
  };

  const onMouseMove = ({ clientX, clientY }) => {
    setCoordinates({ clientX, clientY });
  };

  const listItems = [
    {
      title: 'Position X',
      description: coordinates.clientX || '??',
    },
    {
      title: 'Position Y',
      description: coordinates.clientY || '??',
    },
  ];
  return (
    <div>
      <WuiSwitch
        label="Track mouse position"
        checked={tracking}
        onChange={onSwitchChange}
      />
      {tracking ? (
        <WuiWindowEvent event="mousemove" handler={onMouseMove} />
      ) : null}
      <WuiSpacer size="l" />
      <WuiDescriptionList listItems={listItems} />
      <WuiSpacer size="xxl" />
    </div>
  );
};
