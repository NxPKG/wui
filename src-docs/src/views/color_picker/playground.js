import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  createOptionalEnum,
} from '../../services/playground';
import { WuiColorPicker } from '../../../../src/components/';
import { PropTypes } from 'react-view';

const colorPickerConfig = () => {
  const docgenInfo = Array.isArray(WuiColorPicker.__docgenInfo)
    ? WuiColorPicker.__docgenInfo[0]
    : WuiColorPicker.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.color = {
    ...propsToUse.color,
    stateful: false,
    type: PropTypes.String,
    value: '#D36086',
  };

  propsToUse.secondaryInputDisplay = {
    ...propsToUse.secondaryInputDisplay,
    custom: {
      ...propsToUse.secondaryInputDisplay.custom,
      checkDep: (val, state) => {
        if (state.mode.value === 'secondaryInput' && !val) {
          return 'When mode is set to secondaryInput, you must also provide secondaryInputDisplay';
        }
        return undefined;
      },
    },
  };

  propsToUse.format = createOptionalEnum(propsToUse.format);

  propsToUse.onChange = simulateFunction(propsToUse.onChange);
  propsToUse.onBlur = simulateFunction(propsToUse.onBlur);
  propsToUse.onFocus = simulateFunction(propsToUse.onFocus);

  return {
    config: {
      componentName: 'WuiColorPicker',
      props: propsToUse,
      scope: {
        WuiColorPicker,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiColorPicker'],
        },
      },
      customProps: {
        onChange: dummyFunction,
        onBlur: dummyFunction,
        onFocus: dummyFunction,
      },
    },
  };
};

export default [colorPickerConfig];
