import { PropTypes } from 'react-view';
import { WuiImage } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiImage.__docgenInfo)
    ? WuiImage.__docgenInfo[0]
    : WuiImage.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.size = {
    ...propsToUse.size,
    type: PropTypes.Enum,
    options: {
      original: 'original',
      s: 's',
      m: 'm',
      l: 'l',
      xl: 'xl',
      fullWidth: 'fullWidth',
    },
    defaultValue: 'original',
  };
  propsToUse.url.value = 'https://source.unsplash.com/100x100/?Nature';
  propsToUse.alt.value = 'image_alt';

  return {
    config: {
      componentName: 'WuiImage',
      props: propsToUse,
      scope: {
        WuiImage,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiImage'],
        },
      },
    },
  };
};
