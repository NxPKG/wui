import React, { useRef, useState } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiCode,
  WuiIcon,
  WuiPanel,
  WuiSpacer,
  WuiText,
  useResizeObserver,
} from '../../../../src/components';

export const ResizeObserverHookExample = () => {
  const hasResizeObserver = typeof ResizeObserver !== 'undefined';
  const [paddingSize, setPaddingSize] = useState('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const togglePaddingSize = () => {
    setPaddingSize(paddingSize => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems(items => [...items, `Item ${items.length + 1}`]);
  };

  const resizeRef = useRef();
  const dimensions = useResizeObserver(resizeRef.current);

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
          <WuiCode>{`height: ${dimensions.height}; width: ${dimensions.width}`}</WuiCode>
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </WuiButton>

      <WuiSpacer />

      <div className="wui-displayInlineBlock" ref={resizeRef}>
        <WuiPanel className="wui-displayInlineBlock" paddingSize={paddingSize}>
          <ul>
            {items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <WuiSpacer size="s" />
          <WuiButtonEmpty onClick={addItem}>add item</WuiButtonEmpty>
        </WuiPanel>
      </div>
    </div>
  );
};
