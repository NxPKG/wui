import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  iconValidator,
} from '../../services/playground';
import {
  WuiFieldText,
  WuiFieldSearch,
  WuiFieldNumber,
  WuiFieldPassword,
  WuiTextArea,
  WuiCheckbox,
  WuiRadio,
  WuiSwitch,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

const fieldTextConfig = () => {
  const docgenInfo = Array.isArray(WuiFieldText.__docgenInfo)
    ? WuiFieldText.__docgenInfo[0]
    : WuiFieldText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);
  propsToUse.icon = iconValidator(propsToUse.icon);

  return {
    config: {
      componentName: 'WuiFieldText',
      props: propsToUse,
      scope: {
        WuiFieldText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFieldText'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const fieldSearchConfig = () => {
  const docgenInfo = Array.isArray(WuiFieldSearch.__docgenInfo)
    ? WuiFieldSearch.__docgenInfo[0]
    : WuiFieldSearch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.onSearch = simulateFunction(propsToUse.onSearch);
  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiFieldSearch',
      props: propsToUse,
      scope: {
        WuiFieldSearch,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFieldSearch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const fieldNumberConfig = () => {
  const docgenInfo = Array.isArray(WuiFieldNumber.__docgenInfo)
    ? WuiFieldNumber.__docgenInfo[0]
    : WuiFieldNumber.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.icon = iconValidator(propsToUse.icon);
  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.Number,
  };
  propsToUse.step = {
    ...propsToUse.step,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'WuiFieldNumber',
      props: propsToUse,
      scope: {
        WuiFieldNumber,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFieldNumber'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const fieldPasswordConfig = () => {
  const docgenInfo = Array.isArray(WuiFieldPassword.__docgenInfo)
    ? WuiFieldPassword.__docgenInfo[0]
    : WuiFieldPassword.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.type = {
    ...propsToUse.type,
    value: 'password',
    defaultValue: 'password',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiFieldPassword',
      props: propsToUse,
      scope: {
        WuiFieldPassword,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFieldPassword'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const textAreaConfig = () => {
  const docgenInfo = Array.isArray(WuiTextArea.__docgenInfo)
    ? WuiTextArea.__docgenInfo[0]
    : WuiTextArea.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };
  propsToUse.placeholder = {
    ...propsToUse.placeholder,
    type: PropTypes.String,
  };

  propsToUse.resize = {
    ...propsToUse.resize,
    defaultValue: 'vertical',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiTextArea',
      props: propsToUse,
      scope: {
        WuiTextArea,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiTextArea'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const checkboxConfig = () => {
  const docgenInfo = Array.isArray(WuiCheckbox.__docgenInfo)
    ? WuiCheckbox.__docgenInfo[0]
    : WuiCheckbox.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: 'Playground__checkbox',
  };
  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiCheckbox',
      props: propsToUse,
      scope: {
        WuiCheckbox,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiCheckbox'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const radioConfig = () => {
  const docgenInfo = Array.isArray(WuiRadio.__docgenInfo)
    ? WuiRadio.__docgenInfo[0]
    : WuiRadio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    type: PropTypes.String,
    value: 'Playground__radio',
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiRadio',
      props: propsToUse,
      scope: {
        WuiRadio,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiRadio'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

const switchConfig = () => {
  const docgenInfo = Array.isArray(WuiSwitch.__docgenInfo)
    ? WuiSwitch.__docgenInfo[0]
    : WuiSwitch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.checked = {
    ...propsToUse.checked,
    value: true,
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiSwitch',
      props: propsToUse,
      scope: {
        WuiSwitch,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiSwitch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export default [
  fieldTextConfig,
  fieldSearchConfig,
  fieldNumberConfig,
  fieldPasswordConfig,
  textAreaConfig,
  checkboxConfig,
  radioConfig,
  switchConfig,
];
