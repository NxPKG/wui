import React, { useState } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiCode,
  WuiIcon,
  WuiResizeObserver,
  WuiPanel,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

export const ResizeObserverExample = () => {
  const hasResizeObserver = typeof ResizeObserver !== 'undefined';
  const [paddingSize, setPaddingSize] = useState('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const togglePaddingSize = () => {
    setPaddingSize(paddingSize => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems(items => [...items, `Item ${items.length + 1}`]);
  };

  const onResize = ({ height, width }) => {
    setHeight(height);
    setWidth(width);
  };

  return (
    <div>
      <WuiText>
        {hasResizeObserver ? (
          <p>
            <WuiIcon type="checkInCircleFilled" color="secondary" /> Browser
            supports ResizeObserver API.
          </p>
        ) : (
          <p>
            <WuiIcon type="crossInACircleFilled" color="danger" /> Browser does
            not support ResizeObserver API. Using MutationObserver.
          </p>
        )}
        <p>
          <WuiCode>{`height: ${height}; width: ${width}`}</WuiCode>
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </WuiButton>

      <WuiSpacer />

      <WuiResizeObserver onResize={onResize}>
        {resizeRef => (
          <div className="wui-displayInlineBlock" ref={resizeRef}>
            <WuiPanel
              className="wui-displayInlineBlock"
              paddingSize={paddingSize}>
              <ul>
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <WuiSpacer size="s" />
              <WuiButtonEmpty onClick={addItem}>add item</WuiButtonEmpty>
            </WuiPanel>
          </div>
        )}
      </WuiResizeObserver>
    </div>
  );
};
