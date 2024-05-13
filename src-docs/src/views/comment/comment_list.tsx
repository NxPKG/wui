import React from 'react';
import {
  WuiCommentList,
  WuiCommentProps,
} from '../../../../src/components/comment_list';
import { WuiAvatar } from '../../../../src/components/avatar';
import { WuiButtonIcon } from '../../../../src/components/button';
import { WuiText } from '../../../../src/components/text';
import { WuiBadge } from '../../../../src/components/badge';
import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';

const body = (
  <WuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </WuiText>
);

const copyAction = (
  <WuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

const complexEvent = (
  <WuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <WuiFlexItem grow={false}>added tags</WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="primary">sample</WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="secondary">review</WuiBadge>
    </WuiFlexItem>
  </WuiFlexGroup>
);

const complexUsername = (
  <WuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <WuiFlexItem grow={false}>
      <WuiAvatar size="s" type="space" name="Pedro" />
    </WuiFlexItem>
    <WuiFlexItem grow={false}>pedror</WuiFlexItem>
  </WuiFlexGroup>
);

const longBody = (
  <WuiText size="s">
    <p>
      This planet has - or rather had - a problem, which was this: most of the
      people living on it were unhappy for pretty much of the time. Many
      solutions were suggested for this problem, but most of these were largely
      concerned with the movements of small green pieces of paper, which is odd
      because on the whole it was not the small green pieces of paper that were
      unhappy.
    </p>
  </WuiText>
);

const avatar = (
  <WuiAvatar
    imageUrl="https://source.unsplash.com/64x64/?woman"
    size="l"
    name="Juana"
  />
);

const comments: WuiCommentProps[] = [
  {
    username: 'janed',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    username: 'juanab',
    type: 'update',
    actions: copyAction,
    event: 'pushed incident X0Z235',
    timestamp: 'on Jan 3, 2020',
    timelineIcon: avatar,
  },
  {
    username: 'pancho1',
    type: 'update',
    event: 'edited case',
    timestamp: 'on Jan 9, 2020',
  },
  {
    username: complexUsername,
    type: 'update',
    actions: copyAction,
    event: complexEvent,
    timestamp: 'on Jan 11, 2020',
    timelineIcon: 'tag',
  },
  {
    username: 'elohar',
    event: 'added a comment',
    timestamp: 'on Jan 14, 2020',
    timelineIcon: <WuiAvatar size="l" name="Eloha" />,
    children: longBody,
    actions: copyAction,
  },
];

export default () => <WuiCommentList comments={comments} />;
