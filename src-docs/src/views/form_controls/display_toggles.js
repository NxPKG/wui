import React, { cloneElement, Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  WuiFlexGroup,
  WuiSwitch,
  WuiFlexItem,
  WuiToolTip,
  WuiIcon,
  WuiButtonEmpty,
  WuiPopover,
  WuiSpacer,
} from '../../../../src/components';

export class DisplayToggles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      loading: false,
      compressed: false,
      fullWidth: false,
      prepend: false,
      append: false,
      isPopoverOpen: false,
      invalid: false,
    };
  }

  updateProperty = (checked, property) => {
    const currentState = { ...this.state };
    currentState[property] = checked;
    this.setState(currentState);
    this.props.onUpdate && this.props.onUpdate(currentState);
  };

  render() {
    const {
      canIsDisabled,
      canDisabled,
      canReadOnly,
      canLoading,
      canCompressed,
      canFullWidth,
      canPrepend,
      canAppend,
      canInvalid,
      children,
      extras,
      spacerSize,
    } = this.props;

    const canProps = {};
    if (canDisabled) canProps.disabled = this.state.disabled;
    if (canIsDisabled) canProps.isDisabled = this.state.disabled;
    if (canReadOnly) canProps.readOnly = this.state.readOnly;
    if (canLoading) canProps.isLoading = this.state.loading;
    if (canFullWidth) canProps.fullWidth = this.state.fullWidth;
    if (canCompressed) canProps.compressed = this.state.compressed;
    if (canPrepend && this.state.prepend) canProps.prepend = 'Prepend';
    if (canAppend && this.state.append) canProps.append = 'Append';
    if (canInvalid) canProps.isInvalid = this.state.invalid;

    return (
      <Fragment>
        {cloneElement(children, canProps)}
        <WuiSpacer size={spacerSize} />
        <WuiPopover
          panelPaddingSize="s"
          isOpen={this.state.isPopoverOpen}
          closePopover={() => {
            this.setState({ isPopoverOpen: false });
          }}
          button={
            <WuiButtonEmpty
              iconType="controlsHorizontal"
              size="xs"
              onClick={() => {
                this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
              }}>
              Display toggles
            </WuiButtonEmpty>
          }>
          <div>
            <WuiFlexGroup
              wrap={true}
              direction="column"
              gutterSize="s"
              responsive={false}>
              {(canDisabled || canIsDisabled) && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'disabled'}
                    checked={this.state.disabled}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'disabled')
                    }
                  />
                </WuiFlexItem>
              )}
              {canReadOnly && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'readOnly'}
                    checked={this.state.readOnly}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'readOnly')
                    }
                  />
                </WuiFlexItem>
              )}
              {canLoading && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'loading'}
                    checked={this.state.loading}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'loading')
                    }
                  />
                </WuiFlexItem>
              )}
              {canInvalid && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'invalid'}
                    checked={this.state.invalid}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'invalid')
                    }
                  />
                </WuiFlexItem>
              )}
              {canFullWidth && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'fullWidth'}
                    checked={this.state.fullWidth}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'fullWidth')
                    }
                  />
                </WuiFlexItem>
              )}
              {canCompressed && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={
                      <span>
                        compressed{' '}
                        <WuiToolTip content="Compressed usages are very specific. Click to view full compressed documentation">
                          <a href="/#/forms/compressed-forms">
                            <WuiIcon type="help" />
                          </a>
                        </WuiToolTip>
                      </span>
                    }
                    checked={this.state.compressed}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'compressed')
                    }
                  />
                </WuiFlexItem>
              )}
              {canPrepend && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'prepend'}
                    checked={this.state.prepend}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'prepend')
                    }
                  />
                </WuiFlexItem>
              )}
              {canAppend && (
                <WuiFlexItem grow={false}>
                  <WuiSwitch
                    compressed
                    label={'append'}
                    checked={this.state.append}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'append')
                    }
                  />
                </WuiFlexItem>
              )}
              {extras &&
                extras.map((extra, index) => {
                  return (
                    <WuiFlexItem key={index} grow={false}>
                      {extra}
                    </WuiFlexItem>
                  );
                })}
            </WuiFlexGroup>
          </div>
        </WuiPopover>
      </Fragment>
    );
  }
}

DisplayToggles.propTypes = {
  canIsDisabled: PropTypes.bool,
  canDisabled: PropTypes.bool,
  canReadOnly: PropTypes.bool,
  canLoading: PropTypes.bool,
  canCompressed: PropTypes.bool,
  canFullWidth: PropTypes.bool,
  canPrepend: PropTypes.bool,
  canAppend: PropTypes.bool,
  canInvalid: PropTypes.bool,
  extras: PropTypes.arrayOf(PropTypes.node),
  // Manually building the spacer array to avoid having to import Spacer into codesandbox
  spacerSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
};

DisplayToggles.defaultProps = {
  canIsDisabled: false,
  canDisabled: true,
  canReadOnly: true,
  canLoading: true,
  canCompressed: true,
  canFullWidth: true,
  canInvalid: true,
  canPrepend: false,
  canAppend: false,
  spacerSize: 'l',
};
