import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  WuiTitle,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexItem,
  WuiBetaBadge,
  WuiTab,
  WuiTabs,
  WuiHorizontalRule,
} from '../../../../src/components';

const GuidePageComponent = ({
  children,
  title,
  intro,
  isBeta,
  playground,
  guidelines,
  location,
  match,
  history,
}) => {
  const betaBadge = isBeta ? (
    <WuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  ) : (
    undefined
  );

  const tabs = [
    {
      id: 'examples',
      name: 'Examples',
      handleClick: () => {
        history.push(`${match.path}`);
      },
    },
  ];

  if (guidelines)
    tabs.push({
      id: 'guidelines',
      name: 'Guidelines',
      handleClick: () => {
        history.push(`${match.path}/guidelines`);
      },
    });
  if (playground)
    tabs.push({
      id: 'playground',
      name: 'Playground',
      handleClick: () => {
        history.push(`${match.path}/playground`);
      },
    });

  const isGuideLineView = location.pathname.includes('guidelines');
  const isPlaygroundView = location.pathname.includes('playground');

  const renderTabs = () => {
    return tabs.map(({ id, handleClick, name }, index) => {
      let isSelected = false;
      if (id === 'playground') isSelected = isPlaygroundView;
      else if (id === 'guidelines') isSelected = isGuideLineView;
      else isSelected = !isGuideLineView && !isPlaygroundView;

      return (
        <WuiTab
          onClick={() => {
            if (handleClick) handleClick();
          }}
          isSelected={isSelected}
          key={index}>
          {name}
        </WuiTab>
      );
    });
  };

  return (
    <Fragment>
      <div className="guideSection__text">
        <WuiFlexGroup justifyContent="spaceBetween">
          <WuiFlexItem grow={false}>
            <WuiTitle size="l">
              <h1>
                {title} {betaBadge}
              </h1>
            </WuiTitle>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiTabs display="condensed">
              {tabs.length > 1 && renderTabs()}
            </WuiTabs>
          </WuiFlexItem>
        </WuiFlexGroup>

        {tabs.length > 1 && <WuiHorizontalRule />}

        <WuiSpacer size="m" />
      </div>

      <Switch>
        {playground && (
          <Route path={`${match.path}/playground`}>{playground}</Route>
        )}
        {guidelines && (
          <Route path={`${match.path}/guidelines`}>{guidelines}</Route>
        )}
        <Route path="">
          <div className="guideSection__text">{intro}</div>
          <>{children}</>
        </Route>
      </Switch>

      {/* Give some space between the bottom of long content and the bottom of the screen */}
      <WuiSpacer size="xl" />
    </Fragment>
  );
};

GuidePageComponent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
  componentLinkTo: PropTypes.string,
  isBeta: PropTypes.bool,
  playground: PropTypes.node,
  guidelines: PropTypes.node,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};

export const GuidePage = withRouter(GuidePageComponent);
