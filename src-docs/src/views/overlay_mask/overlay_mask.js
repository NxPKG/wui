import React, { useState } from 'react';

import {
  WuiOverlayMask,
  WuiButton,
  WuiSpacer,
  WuiTitle,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [maskWithClickOpen, changeMaskWithClick] = useState(false);

  const modal = (
    <React.Fragment>
      <WuiOverlayMask
        onClick={() => {
          changeMask(false);
        }}>
        <WuiTitle>
          <h2> Click anywhere to close overlay. </h2>
        </WuiTitle>
      </WuiOverlayMask>
    </React.Fragment>
  );

  const maskWithClick = (
    <WuiOverlayMask>
      <WuiButton
        onClick={() => {
          changeMaskWithClick(false);
        }}>
        Click this button to close
      </WuiButton>
    </WuiOverlayMask>
  );

  return (
    <React.Fragment>
      <WuiButton
        onClick={() => {
          changeMask(true);
        }}>
        Overlay with onClick
      </WuiButton>
      <WuiSpacer size="xxl" />
      <WuiButton onClick={() => changeMaskWithClick(true)}>
        Overlay with button
      </WuiButton>
      {maskOpen ? modal : undefined}
      {maskWithClickOpen ? maskWithClick : undefined}
    </React.Fragment>
  );
};
