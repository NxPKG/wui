import React from 'react';

import { WuiSelectableListItem } from '../../../../src/components/selectable';
import { WuiAvatar } from '../../../../src/components/avatar';
import { WuiPanel } from '../../../../src/components/panel';

export default () => {
  const props = {
    style: {
      height: 68,
      width: '100%',
    },
    title: 'Example of the WuiSelectableSitewideOption',
    showIcons: false,
    prepend: <WuiAvatar name="B" color="#eee" type="space" size="s" />,
    append: <WuiAvatar name="C" color="#eee" type="space" size="s" />,
    className: 'wuiSelectableTemplateSitewide__listItem',
    role: 'presentation',
    'aria-selected': undefined,
  };

  return (
    <WuiPanel paddingSize="none">
      <WuiSelectableListItem {...props}>
        <span className="wuiSelectableTemplateSitewide__listItemTitle">
          A. Label
        </span>
        <span className="wuiSelectableTemplateSitewide__optionMetasList">
          <span className="wuiSelectableTemplateSitewide__optionMeta wuiSelectableTemplateSitewide__optionMeta--application">
            D. Meta
          </span>
          <span className="wuiSelectableTemplateSitewide__optionMeta wuiSelectableTemplateSitewide__optionMeta--deployment">
            Deployment
          </span>
          <span className="wuiSelectableTemplateSitewide__optionMeta">
            Default display
          </span>
        </span>
      </WuiSelectableListItem>
    </WuiPanel>
  );
};
