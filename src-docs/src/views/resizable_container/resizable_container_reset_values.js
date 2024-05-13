import React, { useCallback, useState } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiText,
  WuiResizableContainer,
  WuiButton,
  WuiSpacer,
} from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

const firstPanelId = 'resizable-panel__1';
const secondPanelId = 'resizable-panel__2';
const stored = localStorage.getItem('resizableContainer');
const storedSizes = stored && JSON.parse(stored);
const defaultSizes = storedSizes || {
  [firstPanelId]: 50,
  [secondPanelId]: 50,
};

export default () => {
  const [savedSizes, setSavedSizes] = useState(storedSizes);
  const [sizes, setSizes] = useState(defaultSizes);
  const onPanelWidthChange = useCallback(newSizes => {
    setSizes(prevSizes => ({
      ...prevSizes,
      ...newSizes,
    }));
  }, []);
  const onClickDefault = useCallback(() => setSizes(defaultSizes), []);
  const onClick30x70 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 30,
        [secondPanelId]: 70,
      }),
    []
  );
  const onClick80x20 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 80,
        [secondPanelId]: 20,
      }),
    []
  );
  const onSaveToLocalStorage = useCallback(() => {
    setSavedSizes(sizes);
    localStorage.setItem('resizableContainer', JSON.stringify(sizes));
  }, [sizes]);

  return (
    <>
      <WuiFlexGroup>
        <WuiFlexItem>
          <WuiButton onClick={onClickDefault}>{'Reset to defaults'}</WuiButton>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiButton onClick={onClick30x70}>{'30x70'}</WuiButton>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiButton onClick={onClick80x20}>{'80x20'}</WuiButton>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiButton
            fill={savedSizes === sizes}
            iconType={savedSizes === sizes ? 'check' : undefined}
            onClick={onSaveToLocalStorage}>
            {'Store in localStorage'}
          </WuiButton>
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer />

      <WuiResizableContainer
        style={{ height: '400px' }}
        onPanelWidthChange={onPanelWidthChange}>
        {(WuiResizablePanel, WuiResizableButton) => (
          <>
            <WuiResizablePanel
              id={firstPanelId}
              size={sizes[firstPanelId]}
              minSize="30%">
              <WuiText>
                <p>{text}</p>
              </WuiText>
            </WuiResizablePanel>

            <WuiResizableButton size="l" />

            <WuiResizablePanel
              id={secondPanelId}
              size={sizes[secondPanelId]}
              minSize="200px">
              <WuiText>
                <p>{text}</p>
              </WuiText>
            </WuiResizablePanel>
          </>
        )}
      </WuiResizableContainer>
    </>
  );
};
