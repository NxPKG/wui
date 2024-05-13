import React, { Component, HTMLAttributes } from 'react';
import { WuiComment } from '../../../../src/components/comment_list';
import { WuiButtonIcon } from '../../../../src/components/button';
import { WuiText } from '../../../../src/components/text';
import { WuiPopover } from '../../../../src/components/popover';
import {
  WuiContextMenuPanel,
  WuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { CommonProps } from '../../../../src/components/common';

const body = (
  <WuiText size="s">
    <p>
      This comment has custom actions available. See the upper right corner.
    </p>
  </WuiText>
);

export type CustomActionsProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

interface CustomActionsState {
  isPopoverOpen: boolean;
}

export default class extends Component<CustomActionsProps, CustomActionsState> {
  state = {
    isPopoverOpen: false,
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const { isPopoverOpen } = this.state;
    const customActions = (
      <WuiPopover
        button={
          <WuiButtonIcon
            aria-label="Actions"
            iconType="gear"
            size="s"
            color="text"
            onClick={() => this.togglePopover()}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => this.closePopover()}
        panelPaddingSize="none"
        anchorPosition="leftCenter">
        <WuiContextMenuPanel
          items={[
            <WuiContextMenuItem
              key="A"
              icon="pencil"
              onClick={() => {
                this.closePopover();
              }}>
              Edit
            </WuiContextMenuItem>,
            <WuiContextMenuItem
              key="B"
              icon="share"
              onClick={() => {
                this.closePopover();
              }}>
              Share
            </WuiContextMenuItem>,
            <WuiContextMenuItem
              key="C"
              icon="copy"
              onClick={() => {
                this.closePopover();
              }}>
              Copy
            </WuiContextMenuItem>,
          ]}
        />
      </WuiPopover>
    );
    return (
      <div>
        <WuiComment
          username="janed"
          event="added a comment"
          actions={customActions}
          timestamp="Jan 1, 2020">
          {body}
        </WuiComment>
      </div>
    );
  }
}
