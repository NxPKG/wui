import React, { useEffect, useState } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiCodeBlock,
  WuiForm,
  WuiFormRow,
  WuiSpacer,
  WuiTextArea,
  WuiTour,
  WuiTourStep,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
    content: (
      <span>
        <p>Copy and paste this sample query.</p>
        <WuiSpacer />
        <WuiCodeBlock language="html" paddingSize="s" isCopyable>
          {'SELECT email FROM “wazuh_sample_data_ecommerce”'}
        </WuiCodeBlock>
      </span>
    ),
    anchorPosition: 'rightUp',
  },
  {
    step: 2,
    title: 'Step 2',
    content: <p>Save your changes.</p>,
    anchorPosition: 'rightUp',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: false,
  tourPopoverWidth: 360,
  tourSubtitle: 'Demo tour',
};

const STORAGE_KEY = 'tourDemo_Managed_v2';

export default () => {
  const [queryValue, setQueryValue] = useState('');

  let state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    state = JSON.parse(state);
    state = { ...state, isTourActive: false };
  } else {
    state = tourConfig;
  }

  return (
    <WuiTour steps={demoTourSteps} initialState={state}>
      {([wuiTourStepOne, wuiTourStepTwo], actions, reducerState) => {
        useEffect(() => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducerState));
        }, [reducerState]);

        const handleClick = () => {
          actions.finishTour();
        };

        const resetTour = () => {
          actions.resetTour();
          setQueryValue('');
        };

        const onChange = e => {
          setQueryValue(e.target.value);

          if (reducerState.currentTourStep < 2) {
            actions.incrementStep();
          }
        };
        return (
          <React.Fragment>
            <WuiButtonEmpty iconType="refresh" flush="left" onClick={resetTour}>
              Start or reset tour
            </WuiButtonEmpty>
            <WuiSpacer />
            <WuiForm>
              <WuiFormRow label="Enter an ES SQL query">
                <WuiTourStep {...wuiTourStepOne}>
                  <WuiTextArea
                    placeholder="Placeholder text"
                    aria-label="Enter ES SQL query"
                    value={queryValue}
                    onChange={onChange}
                    style={{ width: 400 }}
                  />
                </WuiTourStep>
              </WuiFormRow>

              <WuiSpacer />

              <WuiTourStep {...wuiTourStepTwo}>
                <WuiButton onClick={handleClick}>Save query</WuiButton>
              </WuiTourStep>
            </WuiForm>
          </React.Fragment>
        );
      }}
    </WuiTour>
  );
};
