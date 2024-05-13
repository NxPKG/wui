import React, { Fragment, useState } from 'react';

import { GuideFullScreen } from '../../services';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiColorPicker,
  WuiColorPickerSwatch,
  WuiPage,
  WuiPageBody,
  WuiPageHeader,
  WuiPageHeaderSection,
  WuiPageContent,
  WuiPageContentHeader,
  WuiPageContentHeaderSection,
  WuiPageContentBody,
  WuiSpacer,
  WuiStat,
  WuiTab,
  WuiTabs,
  WuiTextArea,
  WuiTitle,
  WuiTourStep,
  useWuiTour,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
  },
  {
    step: 2,
    title: 'Step 2',
    anchorPosition: 'upCenter',
    content: <p>What is your favorite color?</p>,
  },
  {
    step: 3,
    title: 'Step 3',
    content: <p>Click here for more cool things.</p>,
    anchorPosition: 'downRight',
    minWidth: 'auto',
  },
  {
    step: 4,
    title: 'Step 4',
    anchorPosition: 'downLeft',
    decoration: 'none',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: true,
  tourSubtitle: 'Demo tour',
};

export default () => {
  const [color, setColor] = useState('#000');
  const [selectedTabId, setSelectedTabId] = useState('query');
  const [
    [wuiTourStepOne, wuiTourStepTwo, wuiTourStepThree, wuiTourStepFour],
    actions,
    reducerState,
  ] = useWuiTour(demoTourSteps, tourConfig);

  const onSelectColor = color => {
    setColor(color);
    if (reducerState.currentTourStep === 2) {
      actions.goToStep(3);
    }
  };

  const onTabClick = id => {
    if (id === 'stat' && reducerState.currentTourStep === 3) {
      actions.goToStep(4);
    }
    setSelectedTabId(id);
  };

  const onReset = () => {
    actions.resetTour();
    setSelectedTabId('query');
  };

  const tabs = [
    {
      id: 'query',
      name: 'Query',
      disabled: false,
      content: (
        <div>
          <WuiSpacer />
          <WuiTourStep
            {...wuiTourStepOne}
            content={
              <div>
                <p>This is a neat thing. You enter queries here.</p>
                <WuiSpacer />
                <WuiButton color="primary" onClick={actions.incrementStep}>
                  Ok, got it.
                </WuiButton>
              </div>
            }>
            <WuiTextArea
              placeholder="Placeholder text"
              aria-label="Enter ES SQL query"
              defaultValue="{queryValue}"
              style={{ width: 400 }}
            />
          </WuiTourStep>

          <WuiSpacer />

          <WuiTourStep
            {...wuiTourStepTwo}
            footerAction={
              <WuiButtonEmpty
                color="text"
                flush="right"
                size="xs"
                onClick={actions.incrementStep}>
                {"I don't have a favorite color"}
              </WuiButtonEmpty>
            }>
            <WuiColorPicker
              onChange={onSelectColor}
              color={color}
              mode="swatch"
              button={
                <WuiColorPickerSwatch
                  color={color}
                  aria-label="Select a color"
                />
              }
            />
          </WuiTourStep>
        </div>
      ),
    },
    {
      id: 'stat',
      name: (
        <WuiTourStep {...wuiTourStepThree}>
          <span>Stats</span>
        </WuiTourStep>
      ),
      disabled: false,
      content: (
        <div>
          <WuiSpacer />
          <WuiTourStep
            {...wuiTourStepFour}
            content={
              <div>
                <p>That about does it.</p>
                <WuiSpacer />
                <WuiButton color="primary" onClick={onReset}>
                  Take me to the start.
                </WuiButton>
              </div>
            }>
            <div>
              <WuiStat title="22,123" description="Queries" />
            </div>
          </WuiTourStep>
        </div>
      ),
    },
  ];

  return (
    <GuideFullScreen onOpen={onReset}>
      {setIsFullScreen => (
        <React.Fragment>
          <WuiPage className="guideFullScreenOverlay" style={{ zIndex: 9000 }}>
            <WuiPageBody>
              <WuiPageHeader>
                <WuiPageHeaderSection>
                  <WuiTitle size="l">
                    <h1>My app</h1>
                  </WuiTitle>
                </WuiPageHeaderSection>
                <WuiPageHeaderSection>
                  <WuiButton
                    fill
                    onClick={() => setIsFullScreen(false)}
                    iconType="exit"
                    aria-label="Exit fullscreen demo">
                    Exit fullscreen demo
                  </WuiButton>
                </WuiPageHeaderSection>
              </WuiPageHeader>
              <WuiPageContent>
                <WuiPageContentHeader>
                  <WuiPageContentHeaderSection>
                    <WuiTitle>
                      <h2>A new feature to demo</h2>
                    </WuiTitle>
                  </WuiPageContentHeaderSection>
                </WuiPageContentHeader>
                <WuiPageContentBody>
                  <WuiTabs>
                    {tabs.map((tab, index) => (
                      <WuiTab
                        id={tab.id}
                        onClick={() => onTabClick(tab.id)}
                        isSelected={tab.id === selectedTabId}
                        key={index}>
                        {tab.name}
                      </WuiTab>
                    ))}
                  </WuiTabs>
                  {tabs.map((tab, index) => (
                    <Fragment key={index}>
                      {tab.id === selectedTabId && (
                        <div role="tabpanel" aria-labelledby={tab.id}>
                          {tab.content}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </WuiPageContentBody>
              </WuiPageContent>
            </WuiPageBody>
          </WuiPage>
        </React.Fragment>
      )}
    </GuideFullScreen>
  );
};
