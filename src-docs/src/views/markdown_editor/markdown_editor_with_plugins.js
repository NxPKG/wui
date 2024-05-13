import React, { useCallback, useState } from 'react';

import {
  Chart,
  Settings,
  Axis,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import { WUI_CHARTS_THEME_LIGHT } from '../../../../src/themes/charts/themes';

import {
  getDefaultWuiMarkdownParsingPlugins,
  getDefaultWuiMarkdownProcessingPlugins,
  WuiMarkdownEditor,
  WuiMarkdownFormat,
  WuiSpacer,
  WuiCodeBlock,
  WuiButtonToggle,
  WuiModalHeader,
  WuiModalHeaderTitle,
  WuiModalBody,
  WuiModalFooter,
  WuiButton,
  WuiButtonEmpty,
  WuiForm,
  WuiFormRow,
  WuiColorPalettePicker,
  WuiRange,
  WuiText,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

import {
  wuiPaletteComplimentary,
  wuiPaletteCool,
  wuiPaletteForStatus,
  wuiPaletteForTemperature,
  wuiPaletteGray,
  wuiPaletteNegative,
  wuiPalettePositive,
  wuiPaletteWarm,
} from '../../../../src/services/color';

const paletteData = {
  wuiPaletteForStatus,
  wuiPaletteForTemperature,
  wuiPaletteComplimentary,
  wuiPaletteNegative,
  wuiPalettePositive,
  wuiPaletteCool,
  wuiPaletteWarm,
  wuiPaletteGray,
};

const paletteNames = Object.keys(paletteData);

const dg = new DataGenerator();
const generateData = categories => dg.generateGroupedSeries(10, categories);

const chartDemoPlugin = {
  name: 'chartDemoPlugin',
  button: {
    label: 'Chart',
    iconType: 'visBarVerticalStacked',
  },
  helpText: (
    <div>
      <WuiCodeBlock language="md" fontSize="l" paddingSize="s" isCopyable>
        {'!{chart{options}}'}
      </WuiCodeBlock>
      <WuiSpacer size="s" />
      <WuiText size="xs" style={{ marginLeft: 16 }}>
        <p>Where options can contain:</p>
        <ul>
          <li>
            <strong>palette: </strong>A number between 1-8 for each palette.
          </li>
          <li>
            <strong>categories: </strong>
            The number of categories per column
          </li>
        </ul>
      </WuiText>
    </div>
  ),
  editor: function ChartEditor({ node, onSave, onCancel }) {
    const [palette, setPalette] = useState((node && node.palette) || '1');
    const [categories, setCategories] = useState(5);

    const onChange = e => {
      setCategories(parseInt(e.target.value));
    };

    const palettes = paletteNames.map((paletteName, index) => {
      return {
        value: String(index + 1),
        title: paletteName,
        palette: paletteData[paletteNames[index]](categories),
        type: 'fixed',
      };
    });

    return (
      <>
        <WuiModalHeader>
          <WuiModalHeaderTitle>Add chart</WuiModalHeaderTitle>
        </WuiModalHeader>

        <WuiModalBody>
          <>
            <WuiForm>
              <WuiFlexGroup gutterSize="m" style={{ width: 600 }}>
                <WuiFlexItem>
                  <WuiFormRow label="Palette">
                    <WuiColorPalettePicker
                      palettes={palettes}
                      onChange={setPalette}
                      value={palette}
                      compressed
                    />
                  </WuiFormRow>
                </WuiFlexItem>
                <WuiFlexItem>
                  <WuiFormRow label="Categories">
                    <WuiRange
                      value={categories}
                      onChange={onChange}
                      min={1}
                      max={10}
                      compressed
                      showValue
                    />
                  </WuiFormRow>
                </WuiFlexItem>
              </WuiFlexGroup>
            </WuiForm>
            <WuiSpacer />
            <ChartMarkdownRenderer palette={palette} categories={categories} />
          </>
        </WuiModalBody>

        <WuiModalFooter>
          <WuiButtonEmpty onClick={onCancel}>Cancel</WuiButtonEmpty>

          <WuiButton
            onClick={() =>
              onSave(`!{chart${JSON.stringify({ palette, categories })}}`, {
                block: true,
              })
            }
            fill>
            Save
          </WuiButton>
        </WuiModalFooter>
      </>
    );
  },
};

function ChartMarkdownParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  function tokenizeChart(eat, value, silent) {
    if (value.startsWith('!{chart') === false) return false;

    const nextChar = value[7];

    if (nextChar !== '{' && nextChar !== '}') return false; // this isn't actually a chart

    if (silent) {
      return true;
    }

    // is there a configuration?
    const hasConfiguration = nextChar === '{';

    let match = '!{chart';
    let configuration = {};

    if (hasConfiguration) {
      let configurationString = '';

      let openObjects = 0;

      for (let i = 7; i < value.length; i++) {
        const char = value[i];
        if (char === '{') {
          openObjects++;
          configurationString += char;
        } else if (char === '}') {
          openObjects--;
          if (openObjects === -1) {
            break;
          }
          configurationString += char;
        } else {
          configurationString += char;
        }
      }

      match += configurationString;
      try {
        configuration = JSON.parse(configurationString);
      } catch (e) {
        const now = eat.now();
        this.file.fail(`Unable to parse chart JSON configuration: ${e}`, {
          line: now.line,
          column: now.column + 7,
        });
      }
    }

    match += '}';

    return eat(match)({
      type: 'chartDemoPlugin',
      ...configuration,
    });
  }

  tokenizers.chart = tokenizeChart;
  methods.splice(methods.indexOf('text'), 0, 'chart');
}

// receives the configuration from the parser and renders
const ChartMarkdownRenderer = ({ palette, categories }) => {
  const customColors = {
    colors: {
      vizColors: paletteData[paletteNames[palette - 1]](categories),
    },
  };
  return (
    <Chart size={{ height: 320 }}>
      <Settings
        theme={[customColors, WUI_CHARTS_THEME_LIGHT]}
        showLegend={false}
        showLegendDisplayValue={false}
      />
      <BarSeries
        id="status"
        name="Status"
        data={generateData(categories)}
        xAccessor={'x'}
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        stackAccessors={['g']}
      />
      <Axis id="bottom-axis" position="bottom" showGridLines />
      <Axis id="left-axis" position="left" showGridLines />
    </Chart>
  );
};

const exampleParsingList = getDefaultWuiMarkdownParsingPlugins();
exampleParsingList.push(ChartMarkdownParser);

const exampleProcessingList = getDefaultWuiMarkdownProcessingPlugins();
exampleProcessingList[1][1].components.chartDemoPlugin = ChartMarkdownRenderer;

const initialExample = `## Chart plugin

Notice the toolbar above has a new chart button. Click it to add a chart.

Once you finish it'll add some syntax that looks like the below.

!{chart{"palette":"2","categories":5}}
`;

export default () => {
  const [value, setValue] = useState(initialExample);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <WuiMarkdownEditor
        aria-label="WUI markdown editor with plugins demo"
        value={value}
        onChange={setValue}
        height={400}
        uiPlugins={[chartDemoPlugin]}
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
        onParse={onParse}
        errors={messages}
      />
      <WuiSpacer size="s" />
      <div className="wui-textRight">
        <WuiButtonToggle
          label={isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
          size="s"
          isEmpty
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onChange={() => setIsAstShowing(!isAstShowing)}
          isSelected={isAstShowing}
        />
      </div>
      {isAstShowing && <WuiCodeBlock language="json">{ast}</WuiCodeBlock>}

      <WuiMarkdownFormat
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}>
        {value}
      </WuiMarkdownFormat>
    </>
  );
};
