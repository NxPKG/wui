import React, { useState } from 'react';

import { WuiListGroup, WuiListGroupItem } from '../../../../src/components';

export default () => {
  const [favorite1, setFavorite1] = useState(undefined);
  const [favorite2, setFavorite2] = useState('link2');
  const [favorite3, setFavorite3] = useState(undefined);

  const link1Clicked = () => {
    setFavorite1(favorite1 === 'link1' ? undefined : 'link1');
    if (favorite1 === undefined) {
      document.activeElement.blur();
    }
  };

  const link2Clicked = () => {
    setFavorite2(favorite2 === 'link2' ? undefined : 'link2');
    if (favorite2 === undefined) {
      document.activeElement.blur();
    }
  };

  const link3Clicked = () => {
    setFavorite3(favorite3 === 'link3' ? undefined : 'link3');
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  return (
    <WuiListGroup maxWidth={288}>
      <WuiListGroupItem
        id="link1"
        iconType="bullseye"
        label="WUI button link"
        onClick={() => window.alert('Button clicked')}
        isActive
        extraAction={{
          color: 'subdued',
          onClick: link1Clicked,
          iconType: favorite1 === 'link1' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link1',
          alwaysShow: favorite1 === 'link1',
        }}
      />

      <WuiListGroupItem
        id="link2"
        iconType="beaker"
        onClick={() => window.alert('Button clicked')}
        label="WUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link2Clicked,
          iconType: favorite2 === 'link2' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link2',
          alwaysShow: favorite2 === 'link2',
        }}
      />

      <WuiListGroupItem
        id="link3"
        onClick={() => window.alert('Button clicked')}
        iconType="broom"
        label="WUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link3Clicked,
          iconType: favorite3 === 'link3' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link3',
          alwaysShow: favorite3 === 'link3',
          isDisabled: true,
        }}
      />

      <WuiListGroupItem
        id="link4"
        iconType="brush"
        isDisabled
        label="WUI button link"
        extraAction={{
          color: 'subdued',
          onClick: () => window.alert('Action clicked'),
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
        }}
      />
    </WuiListGroup>
  );
};
