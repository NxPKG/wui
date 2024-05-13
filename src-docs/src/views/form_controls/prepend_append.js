import React, { Fragment, useState } from 'react';

import {
  WuiButtonEmpty,
  WuiButtonIcon,
  WuiFieldText,
  WuiIcon,
  WuiIconTip,
  WuiPopover,
  WuiSpacer,
  WuiSwitch,
  WuiText,
  WuiToolTip,
} from '../../../../src/components';

export default () => {
  const [isCompressed, setCompressed] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(false);

  return (
    <Fragment>
      <WuiSwitch
        label="compressed"
        checked={isCompressed}
        onChange={e => setCompressed(e.target.checked)}
      />
      &emsp;
      <WuiSwitch
        label="disabled"
        checked={isDisabled}
        onChange={e => setDisabled(e.target.checked)}
      />
      &emsp;
      <WuiSwitch
        label="readOnly"
        checked={isReadOnly}
        onChange={e => setReadOnly(e.target.checked)}
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="String & text in a tooltip"
        prepend="String"
        append={
          <WuiToolTip content="content">
            <WuiText size="s">Tooltip</WuiText>
          </WuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="XS empty button in a popover & tooltip"
        prepend={
          <WuiPopover
            button={
              <WuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
                Popover
              </WuiButtonEmpty>
            }
            closePopover={() => {}}
          />
        }
        append={
          <WuiToolTip content="content">
            <WuiButtonEmpty size="xs">Tooltip</WuiButtonEmpty>
          </WuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="XS empty buttons with icons"
        prepend={
          <WuiButtonEmpty
            role="button"
            size="xs"
            iconType="arrowDown"
            iconSide="right"
            aria-label="Calendar dropdown">
            <WuiIcon type="calendar" />
          </WuiButtonEmpty>
        }
        append={
          <WuiButtonEmpty size="xs" iconType="gear">
            Tooltip
          </WuiButtonEmpty>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="Icon & button icon"
        prepend={<WuiIcon type="vector" />}
        append={<WuiButtonIcon iconType="gear" aria-label="Gear this" />}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="Icons in buttons and popovers and tooltips"
        prepend={[
          <WuiIcon type="vector" />,
          <WuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        append={[
          <WuiPopover
            button={<WuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          <WuiIconTip content="content" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="Icon button in popover & tooltip"
        append={
          <WuiPopover
            button={<WuiButtonIcon iconType="arrowDown" aria-label="Popover" />}
            closePopover={() => {}}
          />
        }
        prepend={
          <WuiToolTip content="content">
            <WuiButtonIcon iconType="gear" aria-label="Gear this" />
          </WuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="Icon and string & string and icon button"
        prepend={[<WuiIcon type="vector" />, 'String']}
        append={[
          'String',
          <WuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <WuiSpacer />
      <WuiFieldText
        placeholder="String and button icon in tooltip & button icon in popover and string "
        prepend={[
          'String',
          <WuiToolTip content="content">
            <WuiButtonIcon iconType="gear" aria-label="Gear this" />
          </WuiToolTip>,
        ]}
        append={[
          <WuiPopover
            button={<WuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          'String',
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
    </Fragment>
  );
};
