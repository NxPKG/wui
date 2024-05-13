import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
  WuiButton,
  WuiFocusTrap,
  WuiHorizontalRule,
  WuiNavDrawer,
  WuiNavDrawerGroup,
} from '../../../../src/components';
import { Headers, MainBody } from './components';
import {
  observabilityLinks,
  searchLinks,
  securityLinks,
  analyzeLinks,
  adminLinks,
  topLinks,
} from './links';

export default () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNavDrawerLocked, setIsNavDrawerLocked] = useState(false);

  useEffect(() => {
    document.body.classList.add('wuiBody--headerIsFixed--triple');
  }, []);

  const toggleFullScreen = () => setIsFullScreen(isFullScreen => !isFullScreen);

  const onNavDrawerLocked = isLocked => setIsNavDrawerLocked(isLocked);

  const navDrawerRef = useRef(null);

  let fullScreenDisplay;

  if (isFullScreen) {
    fullScreenDisplay = (
      <WuiFocusTrap>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}>
          <Headers
            isNavDrawerLocked={isNavDrawerLocked}
            navDrawerRef={navDrawerRef}
          />
          {/**** Navigation Side Panel ****/}
          <WuiNavDrawer ref={navDrawerRef} onIsLockedUpdate={onNavDrawerLocked}>
            <WuiNavDrawerGroup listItems={topLinks} />
            <WuiHorizontalRule margin="none" />
            <WuiNavDrawerGroup listItems={analyzeLinks} />
            <WuiNavDrawerGroup listItems={securityLinks} />
            <WuiNavDrawerGroup listItems={searchLinks} />
            <WuiNavDrawerGroup listItems={observabilityLinks} />
            <WuiHorizontalRule margin="none" />
            <WuiNavDrawerGroup listItems={adminLinks} />
          </WuiNavDrawer>
          <MainBody toggleFullScreen={toggleFullScreen} />
        </div>
      </WuiFocusTrap>
    );
  }
  return (
    <Fragment>
      <WuiButton
        onClick={toggleFullScreen}
        iconType="fullScreen"
        aria-label="Show fullscreen demo">
        Show fullscreen demo
      </WuiButton>

      {/*
         If the below fullScreen code renders, it actually attaches to the body because of
         WuiOverlayMask's React portal usage.
       */}

      {fullScreenDisplay}
    </Fragment>
  );
};
