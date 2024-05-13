import { PropTypes } from 'react-view';
import { WuiAspectRatio } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiAspectRatio.__docgenInfo)
    ? WuiAspectRatio.__docgenInfo[0]
    : WuiAspectRatio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.height.value = 9;
  propsToUse.width.value = 16;

  propsToUse.children = {
    value: `<iframe
    title="Wazuh is a search company"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/yJarWSLRM24"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiAspectRatio',
      props: propsToUse,
      scope: {
        WuiAspectRatio,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiAspectRatio'],
        },
      },
    },
  };
};
