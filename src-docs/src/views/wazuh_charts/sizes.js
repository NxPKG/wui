import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { ThemeContext } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineAnnotation,
  BarSeries,
} from '@elastic/charts';

import {
  WUI_CHARTS_THEME_DARK,
  WUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  WuiSpacer,
  WuiTitle,
  WuiFlexGrid,
  WuiFlexItem,
  WuiPageContent,
  WuiFormRow,
  WuiRange,
  WuiPage,
  WuiButton,
  WuiCopy,
} from '../../../../src/components';

import { formatDate, dateFormatAliases } from '../../../../src/services';

import { MultiChartCard, ChartCard } from './shared';

import { TIME_DATA, TIME_DATA_2 } from './data';

export class Sizes extends Component {
  constructor(props) {
    super(props);

    this.mediumSize = 50;
    this.smallSize = 40;
    this.xsmallSize = 33;

    this.state = {
      multi: false,
      stacked: false,
      width: 100,
      data1: TIME_DATA,
      data2: TIME_DATA_2,
    };
  }

  componentDidMount = () => {
    this.changePropsBasedOnWidth(100);
  };

  onStackedChange = e => {
    this.setState({
      stacked: e.target.checked,
    });
  };

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onChartTypeChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  onWidthChartsChange = e => {
    this.setState({
      width: e.target.value,
    });

    this.changePropsBasedOnWidth(e.target.value);
  };

  changePropsBasedOnWidth = width => {
    const data1 = TIME_DATA.slice();
    const data2 = TIME_DATA_2.slice();
    let tooltipProps;
    let legendPosition = 'right';
    const xAxisFormatter = timeFormatter(niceTimeFormatByDay(1));
    let xAxisTitle = `${formatDate(data1[0][0], dateFormatAliases.date)}`;
    let xAxisStyle;
    let yAxisStyle;
    let changeDescription =
      'At full width, you should be able to display all the details you need; axes, tick labels and titles, and legends.';

    if (width < 55) {
      legendPosition = 'bottom';
    }

    if (width < this.mediumSize) {
      const headerFormatter = tooltipData => {
        return `${formatDate(
          tooltipData.value,
          dateFormatAliases.shortDateTime
        )}`;
      };

      tooltipProps = {
        headerFormatter,
      };

      xAxisTitle = `${formatDate(data1[0][0], dateFormatAliases.date)} ${moment(
        data1[0][0]
      ).format('H:mm')} - ${moment(data1[data1.length - 1][0]).format('H:mm')}`;

      xAxisStyle = { tickLabel: { visible: false } };

      changeDescription =
        'When the panel becomes narrower that the axes tick labels begin to get clustered, consider moving the axes range to the axes title.';
    }

    if (width < this.smallSize && data1.length > 20) {
      for (let i = 0; i < data1.length; i++) {
        data1.splice(i + 1, 1);
      }
      for (let i = 0; i < data2.length; i++) {
        data2.splice(i + 1, 1);
      }

      changeDescription =
        'If the points also start becoming to clustured, consider reducing your bin count. For line charts with dots, remove the dots.';
    }

    if (width < this.xsmallSize) {
      yAxisStyle = { tickLabel: { visible: false } };

      changeDescription =
        'At severely narrow panels, consider the key indicators of your data and call these out with annotations instead of displaying all values of all axes.';
    }

    this.setState({
      data1,
      data2,
      legendPosition,
      tooltipProps,
      xAxisTitle,
      xAxisFormatter,
      xAxisStyle,
      yAxisStyle,
      changeDescription,
    });
  };

  render() {
    const {
      multi,
      stacked,
      width,
      tooltipProps,
      data1,
      data2,
      legendPosition,
      xAxisTitle,
      xAxisFormatter,
      xAxisStyle,
      yAxisStyle,
      changeDescription,
    } = this.state;

    const isDarkTheme = this.context.theme.includes('dark');
    const theme = isDarkTheme
      ? WUI_CHARTS_THEME_DARK.theme
      : WUI_CHARTS_THEME_LIGHT.theme;
    const lineAnnotationStyle = isDarkTheme
      ? WUI_CHARTS_THEME_DARK.lineAnnotation
      : WUI_CHARTS_THEME_LIGHT.lineAnnotation;

    let annotation;
    if (width < this.xsmallSize) {
      annotation = (
        <LineAnnotation
          annotationId="anno_"
          domainType="yDomain"
          dataValues={[{ dataValue: 22, details: 'Threshold' }]}
          marker={'22'}
          style={lineAnnotationStyle}
        />
      );
    }

    return (
      <Fragment>
        <WuiPage>
          <WuiPageContent
            horizontalPosition="center"
            style={{
              width: `${width}%`,
              overflow: 'hidden',
            }}>
            <WuiTitle size="xxs">
              <h2>Chart title {multi && ' by type'}</h2>
            </WuiTitle>

            <WuiSpacer size="s" />

            <Chart size={{ height: 200 }}>
              <Settings
                theme={theme}
                showLegend={multi}
                legendPosition={legendPosition}
                tooltip={tooltipProps}
              />
              <BarSeries
                id="series1"
                data={data1}
                xAccessor={0}
                yAccessors={[1]}
                stackAccessors={stacked ? [0] : undefined}
              />
              {multi && (
                <BarSeries
                  id="series2"
                  data={data2}
                  xAccessor={0}
                  yAccessors={[1]}
                  stackAccessors={stacked ? [0] : undefined}
                />
              )}
              {annotation}
              <Axis
                title={xAxisTitle}
                tickFormat={xAxisFormatter}
                id="bottom-axis"
                position="bottom"
                showGridLines={false}
                style={xAxisStyle}
              />
              <Axis id="left-axis" position="left" style={yAxisStyle} />
            </Chart>
          </WuiPageContent>
        </WuiPage>

        <WuiSpacer />

        <WuiFlexGrid
          columns={3}
          className="wuiGuide__chartsPageCrosshairSection">
          <WuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </WuiFlexItem>
          <WuiFlexItem>
            <ChartCard
              title="Width of panel"
              description="Watch how the chart changes depending on how much room is in the panel.">
              <WuiFormRow helpText="These sizes are just for example and don't take mobile-responsiveness into account. Your chart configuration may be different based on different sizes.">
                <WuiRange
                  min={20}
                  max={100}
                  value={width}
                  onChange={this.onWidthChartsChange}
                  aria-label="Width of panel"
                />
              </WuiFormRow>
            </ChartCard>
          </WuiFlexItem>

          <WuiFlexItem>
            <ChartCard
              title="What's changing?"
              description={changeDescription}
            />
          </WuiFlexItem>
        </WuiFlexGrid>

        <WuiSpacer />

        <div className="wui-textCenter">
          <WuiCopy
            textToCopy={`<WuiTitle size="xxs">
  <h3>Chart title ${multi && ' by type'}</h3>
</WuiTitle>

<WuiSpacer size="s" />

<Chart size={{height: 200}}>
  <Settings
    theme={isDarkTheme ? WUI_CHARTS_THEME_DARK.theme : WUI_CHARTS_THEME_LIGHT.theme}
    showLegend={${multi}}
    legendPosition="${legendPosition}"
    tooltip={{ headerFormatter: tooltipData => {
      return \`\${formatDate(
        tooltipData.value,
        dateFormatAliases.shortDateTime
      )}\`;
    }}}
  />
  <BarSeries
    id="series1"
    data={[[0,1],[1,2]]}
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />
  ${
    multi
      ? `<BarSeries
    id="series2"
    data={[[0,1],[1,2]]}
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />`
      : ''
  }
  ${
    annotation
      ? `<LineAnnotation
    annotationId="anno_"
    domainType="yDomain"
    dataValues={[{ dataValue: 1.2, details: 'Threshold' }]}
    marker={'1.2'}
    style={isDarkTheme
      ? WUI_CHARTS_THEME_DARK.lineAnnotation
      : WUI_CHARTS_THEME_LIGHT.lineAnnotation
    }
  />`
      : ''
  }
  <Axis
    id="bottom-axis"
    position="bottom"
    title={'${xAxisTitle}'}
    tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    showGridLines={false}
    style={${JSON.stringify(xAxisStyle)}}
  />
  <Axis
    id="left-axis"
    position="left"
    style={${JSON.stringify(yAxisStyle)}}
  />
</Chart>`}>
            {copy => (
              <WuiButton
                fill
                onClick={copy}
                iconType="copyClipboard"
                disabled={false}>
                {false
                  ? "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </WuiButton>
            )}
          </WuiCopy>
        </div>
      </Fragment>
    );
  }
}

Sizes.contextType = ThemeContext;
