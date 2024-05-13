import React from 'react';

import { WuiListGroup, WuiListGroupItem } from '../../../../src/components';

const handleOnClick = () => {
  alert('Item was clicked');
};

export default () => (
  <WuiListGroup showToolTips>
    <WuiListGroupItem onClick={handleOnClick} label="First item" />

    <WuiListGroupItem onClick={handleOnClick} label="Second item" />

    <WuiListGroupItem
      onClick={handleOnClick}
      label={
        <span>
          Third very, very long item that <strong>will surely</strong> force
          truncation
        </span>
      }
    />

    <WuiListGroupItem
      onClick={handleOnClick}
      wrapText
      label="Fourth very, very long item with wrapping enabled that will not force truncation"
    />
  </WuiListGroup>
);
