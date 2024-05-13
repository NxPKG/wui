import { PropTypes } from 'react-view';
import { WuiEmptyPrompt, WuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiEmptyPrompt.__docgenInfo)
    ? WuiEmptyPrompt.__docgenInfo[0]
    : WuiEmptyPrompt.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    value: '<>You have no spice</>',
    type: PropTypes.ReactNode,
  };

  propsToUse.iconColor = {
    ...propsToUse.iconColor,
    type: PropTypes.Enum,
    defaultValue: 'subdued',
    options: {
      default: 'default',
      subdued: 'subdued',
      secondary: 'secondary',
      accent: 'accent',
      danger: 'danger',
      warning: 'warning',
      ghost: 'ghost',
    },
  };

  propsToUse.actions.type = PropTypes.String;
  propsToUse.body.type = PropTypes.String;
  propsToUse.body.value = `Navigators use massive amounts of spice to gain a limited form of
    prescience. This allows them to safely navigate interstellar space,
    enabling trade and travel throughout the galaxy.
  `;

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  return {
    config: {
      componentName: 'WuiEmptyPrompt',
      props: propsToUse,
      scope: {
        WuiEmptyPrompt,
        WuiButton,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiEmptyPrompt', 'WuiButton'],
        },
      },
    },
  };
};
