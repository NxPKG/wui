import React, { useState } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiFlexItem,
  WuiFlexGroup,
  WuiMutationObserver,
  WuiPanel,
  WuiSpacer,
} from '../../../../src/components';

export const MutationObserver = () => {
  const [lastMutation, setLastMutation] = useState('no changes detected');
  const [buttonColor, setButtonColor] = useState('primary');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const toggleButtonColor = () => {
    setButtonColor(buttonColor === 'primary' ? 'warning' : 'primary');
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const onMutation = ([{ type }]) => {
    setLastMutation(
      type === 'attributes' ? 'button class name changed' : 'DOM tree changed'
    );
  };

  return (
    <div>
      <p>{lastMutation}</p>

      <WuiSpacer />

      <WuiMutationObserver
        observerOptions={{ subtree: true, attributes: true, childList: true }}
        onMutation={onMutation}>
        {mutationRef => (
          <div ref={mutationRef}>
            <WuiButton
              color={buttonColor}
              fill={true}
              onClick={toggleButtonColor}>
              Toggle button color
            </WuiButton>

            <WuiSpacer />

            <WuiFlexGroup>
              <WuiFlexItem grow={false}>
                <WuiPanel grow={false}>
                  <ul>
                    {items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <WuiSpacer size="s" />
                  <WuiButtonEmpty onClick={addItem}>add item</WuiButtonEmpty>
                </WuiPanel>
              </WuiFlexItem>
            </WuiFlexGroup>
          </div>
        )}
      </WuiMutationObserver>
    </div>
  );
};
