import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  WuiBadge,
  WuiRadioGroup,
  WuiSpacer,
  WuiSwitch,
  WuiPanel,
  WuiText,
  WuiTitle,
} from '../../../../src/components';
import { BarSeries, LineSeries, AreaSeries } from '@elastic/charts';
import { devDependencies } from '../../../../package';

const chartsVersion = devDependencies['@elastic/charts'].match(
  /\d+\.\d+\.\d+/
)[0];

export const CHART_COMPONENTS = {
  BarSeries: BarSeries,
  LineSeries: LineSeries,
  AreaSeries: AreaSeries,
};

export const ExternalBadge = () => {
  return (
    <WuiBadge
      iconType="popout"
      iconSide="right"
      onClickAriaLabel="Go to @elastic/charts docs"
      onClick={() =>
        window.open(
          `https://github.com/elastic/elastic-charts/tree/v${chartsVersion}`
        )
      }>
      External library: @elastic/charts v{chartsVersion}
    </WuiBadge>
  );
};

export const ChartCard = ({ title, description, children }) => {
  return (
    <WuiPanel>
      <WuiTitle size="s">
        <span>{title}</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiText size="s">
        <p>{description}</p>
      </WuiText>
      <WuiSpacer size="s" />
      {children}
    </WuiPanel>
  );
};

export const ChartTypeCard = props => {
  const idPrefix = 'chartType';

  const toggleButtonsIcons = [
    {
      id: `${idPrefix}0`,
      label: 'BarSeries',
    },
    {
      id: `${idPrefix}1`,
      label: 'LineSeries',
    },
    {
      id: `${idPrefix}2`,
      label: 'AreaSeries',
    },
  ];

  const [toggleIdSelected, setToggleIdSelectd] = useState(`${idPrefix}0`);

  const onChartTypeChange = optionId => {
    setToggleIdSelectd(optionId);

    const chartType = toggleButtonsIcons.find(({ id }) => id === optionId)
      .label;
    props.onChange(chartType);
  };

  if (props.mixed) {
    toggleButtonsIcons[3] = {
      id: `${idPrefix}3`,
      label: 'Mixed',
      disabled: props.mixed === 'disabled',
    };
  }

  return (
    <ChartCard
      title="Chart types"
      description={`${props.type} charts can be displayed as any x/y series type.`}>
      <WuiRadioGroup
        compressed
        options={toggleButtonsIcons}
        idSelected={toggleIdSelected}
        onChange={onChartTypeChange}
        disabled={props.disabled}
      />
    </ChartCard>
  );
};

ChartTypeCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  mixed: PropTypes.oneOf(['enabled', 'disabled', true, false]),
  disabled: PropTypes.bool,
};

export const MultiChartCard = props => {
  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);

  const onMultiChange = e => {
    const isStacked = e.target.checked ? stacked : false;

    setMulti(e.target.checked);
    setStacked(isStacked);

    props.onChange({
      multi: e.target.checked,
      stacked,
    });
  };

  const onStackedChange = e => {
    setStacked(e.target.checked);

    props.onChange({ multi: multi, stacked: e.target.checked });
  };
  return (
    <ChartCard
      textAlign="left"
      title="Single vs multiple series"
      description="Legends are only necessary when there are multiple series. Stacked series indicates accumulation but can hide subtle differences. Do not stack line charts.">
      <WuiSwitch
        label="Show multi-series"
        checked={multi}
        onChange={onMultiChange}
      />
      <WuiSpacer size="s" />
      <WuiSwitch
        label="Stacked"
        checked={stacked}
        onChange={onStackedChange}
        disabled={!multi}
      />
    </ChartCard>
  );
};

MultiChartCard.propTypes = {
  /**
   * Returns (multi:boolean, stacked:boolean)
   */
  onChange: PropTypes.func.isRequired,
};
