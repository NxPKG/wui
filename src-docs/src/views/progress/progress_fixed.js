import React, { useState, useEffect } from 'react';

import {
  WuiProgress,
  WuiSpacer,
  WuiButton,
  WuiText,
  WuiPanel,
  WuiCallOut,
  WuiFlexGroup,
  WuiFlexItem,
  WuiHeader,
  WuiHeaderLogo,
  WuiHeaderSection,
  WuiHeaderSectionItem,
  WuiPortal,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  let timer;
  const progress = value => {
    if (value > 100) {
      setValue(100);
    } else {
      setValue(value);
      const diff = Math.round(Math.random() * 10);
      timer = setTimeout(() => progress(value + diff), 250);
    }
  };

  const toggleProgress = () => {
    const currentState = showProgress;

    if (!currentState) {
      timer = setTimeout(() => progress(0), 250);
    } else {
      clearTimeout(timer);
      setValue(0);
    }
    setShowProgress(!showProgress);
    setShowHeader(false);
  };

  const toggleHeader = () => {
    setShowProgress(false);
    setShowHeader(!showHeader);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  let progress2 = null;

  if (showProgress) {
    progress2 = (
      <div>
        <WuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>The progress bar is fixed to the top of your browser.</p>
        </WuiCallOut>
        <WuiProgress value={value} max={100} size="s" position="fixed" />
      </div>
    );
  }

  if (showHeader) {
    progress2 = (
      <div>
        <WuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>
            The progress bar is fixed to the top of your browser and positioned
            above an <strong>WuiHeader</strong>.
          </p>
        </WuiCallOut>
        <WuiHeader
          style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
          <WuiHeaderSection grow={false}>
            <WuiHeaderSectionItem border="right">
              <WuiHeaderLogo
                iconType="logoWazuh"
                href="#"
                aria-label="Go to home page"
              />
            </WuiHeaderSectionItem>
          </WuiHeaderSection>
        </WuiHeader>
        <div style={{ position: 'absolute', zIndex: '5' }}>
          <WuiPortal>
            <WuiProgress size="xs" color="accent" position="fixed" />
          </WuiPortal>
        </div>
      </div>
    );
  }

  return (
    <div>
      <WuiPanel style={{ width: 300, position: 'relative' }}>
        <WuiProgress size="xs" color="accent" position="absolute" />
        <WuiText>
          <h2>Absolutely!</h2>
          <p>
            The progress bar is absolutely positioned in this panel. You could
            see how this might be useful in our Toast component.
          </p>
        </WuiText>
      </WuiPanel>

      <WuiSpacer size="l" />

      <WuiFlexGroup gutterSize="s" alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiButton size="s" onClick={toggleProgress}>
            Toggle a fixed bar
          </WuiButton>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButton size="s" onClick={toggleHeader}>
            Toggle a fixed bar with header
          </WuiButton>
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="l" />

      {progress2}
    </div>
  );
};
