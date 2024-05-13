import React, { useState, Fragment } from 'react';

import { WuiSpacer, WuiSteps, WuiButton } from '../../../../src/components';

export default () => {
  const [status, setStatus] = useState('incomplete');

  let completeButton;
  if (status !== 'complete') {
    completeButton = (
      <WuiButton onClick={() => setStatus('complete')}>
        You complete me
      </WuiButton>
    );
  } else {
    completeButton = (
      <WuiButton onClick={() => setStatus('incomplete')}>Reset</WuiButton>
    );
  }

  let warningButton;
  if (status !== 'warning') {
    warningButton = (
      <WuiButton color="warning" onClick={() => setStatus('warning')}>
        Uh oh!
      </WuiButton>
    );
  } else {
    warningButton = (
      <WuiButton color="warning" onClick={() => setStatus('incomplete')}>
        Reset
      </WuiButton>
    );
  }

  let dangerButton;
  if (status !== 'danger') {
    dangerButton = (
      <WuiButton color="danger" onClick={() => setStatus('danger')}>
        Something terrible
      </WuiButton>
    );
  } else {
    dangerButton = (
      <WuiButton color="danger" onClick={() => setStatus('incomplete')}>
        Reset
      </WuiButton>
    );
  }

  const firstSetOfSteps = [
    {
      title: 'Normal step',
      children: <p>Do this first</p>,
    },
    {
      title: 'Push the button to complete this final step',
      children: (
        <Fragment>
          <p>We are fancy buttons just waiting to be pushed!</p>
          <WuiSpacer />
          {completeButton} {warningButton} {dangerButton}
        </Fragment>
      ),
      status: status,
    },
  ];

  return (
    <div>
      <WuiSteps steps={firstSetOfSteps} />
    </div>
  );
};
