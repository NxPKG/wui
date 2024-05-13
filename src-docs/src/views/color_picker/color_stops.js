import React, { useState } from 'react';

import { WuiColorStops, WuiFormRow } from '../../../../src/components';

import { useColorStopsState } from '../../../../src/services';

export default () => {
  const [colorStops, setColorStops, addColor] = useColorStopsState(true);

  const [extendedColorStops, setExtendedColorStops] = useState([
    {
      stop: 100,
      color: '#54B399',
    },
    {
      stop: 250,
      color: '#D36086',
    },
    {
      stop: 350,
      color: '#9170B8',
    },
  ]);

  const handleExtendedChange = colorStops => {
    setExtendedColorStops(colorStops);
  };

  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = colorStops => {
    setEmptyColorStops(colorStops);
  };

  return (
    <React.Fragment>
      <WuiFormRow label="Empty start">
        <WuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          max={100}
        />
      </WuiFormRow>
      <WuiFormRow label="Standard">
        <WuiColorStops
          label="Standard"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
        />
      </WuiFormRow>
      <WuiFormRow label="Random new color">
        <WuiColorStops
          label="Random new color"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          addColor={addColor}
        />
      </WuiFormRow>
      <WuiFormRow label="Extended range">
        <WuiColorStops
          label="Extended range"
          onChange={handleExtendedChange}
          colorStops={extendedColorStops}
          min={100}
          max={400}
        />
      </WuiFormRow>
      <WuiFormRow label="Fixed color segments">
        <WuiColorStops
          label="Fixed color segments"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </WuiFormRow>
    </React.Fragment>
  );
};
