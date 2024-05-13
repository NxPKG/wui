import { PropTypes } from 'react-view';
import {
  WuiBadge,
  WuiNotificationBadge,
  WuiBetaBadge,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  dummyFunction,
} from '../../services/playground';

export const badgeConfig = () => {
  const docgenInfo = Array.isArray(WuiBadge.__docgenInfo)
    ? WuiBadge.__docgenInfo[0]
    : WuiBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
      modifyOtherProps: (val, state, set) => {
        console.log(val, 'state', state);
        if (val) {
          if (!state.onClickAriaLabel.value) {
            set('onClickAriaLabel', 'onClickAriaLabel');
          }
        } else {
          set(state.onClickAriaLabel.value, 'onClickAriaLabel');
        }
      },
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Badge content',
    hidden: true,
    custom: {
      sanitize: val => {
        return val.replace(/<(?:"[^"]"['"]|'[^']'['"]|[^'">])+>/g, '');
      },
    },
  };

  propsToUse.onClickAriaLabel = {
    ...propsToUse.onClickAriaLabel,
    type: PropTypes.String,
    custom: {
      ...propsToUse.onClickAriaLabel.custom,
      checkDep: (val, state) => {
        if (state.onClick.value && !val) {
          return 'When passing onClick to WuiBadge, you must also provide onClickAriaLabel';
        }
        return undefined;
      },
    },
  };

  propsToUse.iconOnClickAriaLabel = {
    ...propsToUse.iconOnClickAriaLabel,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'WuiBadge',
      props: propsToUse,
      scope: {
        WuiBadge,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiBadge'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};

export const betaBadgeConfig = () => {
  const docgenInfo = Array.isArray(WuiBetaBadge.__docgenInfo)
    ? WuiBetaBadge.__docgenInfo[0]
    : WuiBetaBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'content',
  };

  propsToUse.tooltipContent = {
    ...propsToUse.tooltipContent,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  return {
    config: {
      componentName: 'WuiBetaBadge',
      props: propsToUse,
      scope: {
        WuiBetaBadge,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiBetaBadge'],
        },
      },
    },
  };
};

export const notificationBadgeConfig = () => {
  const docgenInfo = Array.isArray(WuiNotificationBadge.__docgenInfo)
    ? WuiNotificationBadge.__docgenInfo[0]
    : WuiNotificationBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.String,
    value: '10',
    hidden: true,
  };

  return {
    config: {
      componentName: 'WuiNotificationBadge',
      props: propsToUse,
      scope: {
        WuiNotificationBadge,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiNotificationBadge'],
        },
      },
    },
  };
};
