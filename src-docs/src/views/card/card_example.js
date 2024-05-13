import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiCard,
  WuiCallOut,
  WuiCheckableCard,
} from '../../../../src/components';
import cardConfig from './playground';

import { WuiCardSelect } from '../../../../src/components/card/card_select';

import Card from './card';
const cardSource = require('!!raw-loader!./card');
const cardHtml = renderToHtml(Card);

import CardImage from './card_image';
const cardImageSource = require('!!raw-loader!./card_image');
const cardImageHtml = renderToHtml(CardImage);

import CardFooter from './card_footer';
const cardFooterSource = require('!!raw-loader!./card_footer');
const cardFooterHtml = renderToHtml(CardFooter);

import CardBeta from './card_beta';
const cardBetaSource = require('!!raw-loader!./card_beta');
const cardBetaHtml = renderToHtml(CardBeta);

import CardLayout from './card_layout';
const cardLayoutSource = require('!!raw-loader!./card_layout');
const cardLayoutHtml = renderToHtml(CardLayout);

import CardSelectable from './card_selectable';
const cardSelectableSource = require('!!raw-loader!./card_selectable');
const cardSelectableHtml = renderToHtml(CardSelectable);

import CardChildren from './card_children';
const cardChildrenSource = require('!!raw-loader!./card_children');
const cardChildrenHtml = renderToHtml(CardChildren);

import CardCheckable from './card_checkable';
const cardCheckableSource = require('!!raw-loader!./card_checkable');
const cardCheckableHtml = renderToHtml(CardCheckable);

import CardDisplay from './card_display';
const cardDisplaySource = require('!!raw-loader!./card_display');
const cardDisplayHtml = renderToHtml(CardDisplay);

export const CardExample = {
  title: 'Card',
  sections: [
    {
      title: 'Basic card',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardHtml,
        },
      ],
      text: (
        <div>
          <p>
            At its core an <strong>WuiCard</strong> should contain a{' '}
            <WuiCode>title</WuiCode>,<WuiCode>description</WuiCode>, and an{' '}
            <WuiCode>icon</WuiCode>. You can make the whole card clickable by
            giving it an <WuiCode>onClick</WuiCode> handler or{' '}
            <WuiCode>href</WuiCode>.
          </p>
          <p>
            For accessibility and heading hierarchy, a card&apos;s title element
            is a <WuiCode>span</WuiCode> by default. However, this can be
            changed via the <WuiCode>titleElement</WuiCode> prop without
            altering the visual size.
          </p>
        </div>
      ),
      props: { WuiCard },
      demo: <Card />,
      snippet: `<WuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardLayoutHtml,
        },
      ],
      text: (
        <div>
          <p>
            Most of the time, cards should read from top to bottom (vertical).
            However, in some cases, you may want the icon to be to the left of
            the content. In this case, add the prop{' '}
            <WuiCode language="js">layout=&quot;horizontal&quot;</WuiCode>.
            Works best when the icon is size <WuiCode>xl</WuiCode>.
          </p>
          <WuiCallOut
            color="danger"
            title={
              <span>
                Horizontal layouts <strong>do not</strong> work with images,
                footers, or <WuiCode>textAlign</WuiCode>. Therefore, these
                properties will be ignored.
              </span>
            }
          />
        </div>
      ),
      props: { WuiCard },
      demo: <CardLayout />,
      snippet: `<WuiCard
  layout="horizontal"
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Images',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardImageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardImageHtml,
        },
      ],
      text: (
        <div>
          <p>
            Images can be added in place of, or in conjuction with, icons. Just
            pass a url into the <WuiCode>image</WuiCode> prop and it will expand
            to the edges of the card.
          </p>
          <WuiCallOut
            title={
              <span>
                Make sure that all images are the{' '}
                <strong>same proportions</strong> when used in a singular row.
              </span>
            }>
            <p>
              Also, when passing an <strong>element</strong> to the{' '}
              <WuiCode>image</WuiCode> prop that consists solely of inline
              elements or does not contain an
              <WuiCode>{'<img />'}</WuiCode> element, each element will require
              a style of <WuiCode>width: 100%</WuiCode>.
            </p>
          </WuiCallOut>
        </div>
      ),
      props: { WuiCard },
      demo: <CardImage />,
      snippet: `<WuiCard
  textAlign="left"
  image="https://source.unsplash.com/400x200/?Nature"
  title="title"
  description="description"
  onClick={handleClick}
/>`,
    },
    {
      title: 'Footer',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardFooterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardFooterHtml,
        },
      ],
      text: (
        <>
          <p>
            Footers can contain any number of elements and will always align to
            the bottom of the card. However, if you supply a footer containing a{' '}
            <strong>WuiButton</strong> you <strong>must not</strong> also give
            it an <WuiCode>onClick</WuiCode>.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                When using footers to display generic &quot;Go&quot; buttons,
                you must provide an <WuiCode>aria-label</WuiCode> to the button
                itself that refers back to the title of the card.
              </span>
            }
          />
        </>
      ),
      components: { WuiCard },
      demo: <CardFooter />,
      snippet: `<WuiCard
  icon={icon}
  title="title"
  description="description"
  footer={footer}
/>`,
    },
    {
      title: 'Beta badge',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardBetaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardBetaHtml,
        },
      ],
      text: (
        <p>
          If the card links to or references a module that is not GA (beta, lab,
          etc), you can add a <WuiCode>betaBadgeLabel</WuiCode> and{' '}
          <WuiCode>betaBadgeTooltipContent</WuiCode> to the card and it will
          properly create and position an <strong>WuiBetaBadge</strong>. If you
          want to change the title of the tooltip, supply a{' '}
          <WuiCode>betaBadgeTitle</WuiCode> prop.
        </p>
      ),
      props: { WuiCard },
      demo: <CardBeta />,
      snippet: `<WuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
  betaBadgeLabel="betaBadgeLabel"
  betaBadgeTooltipContent={betaBadgeTooltipContent}
/>`,
    },
    {
      title: 'Selectable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSelectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardSelectableHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When you have a list of cards that can be selected but{' '}
            <strong>do not navigate anywhere</strong>, you can add the{' '}
            <WuiCode>selectable</WuiCode> prop. The prop is an object that
            extends <strong>WuiButtonEmpty</strong>. It will apply the button as
            seen below, and passing{' '}
            <WuiCode language="js">selectable.isSelected=true</WuiCode> will
            alter the styles of the card and button to look selected.
          </p>
          <WuiCallOut
            color="warning"
            title="When providing an extra link to more details or such, be sure to
            stop event propagation from also selecting the card."
          />
        </Fragment>
      ),
      props: { WuiCardSelect },
      demo: <CardSelectable />,
      snippet: `<WuiCard
  icon={icon}
  title="title"
  description="description"
  selectable={{
    onClick: cardClicked,
    isSelected: cardIsSelected,
    isDisabled: cardIsDisabled,
  }}
  footer={footer}
/>`,
    },
    {
      title: 'Checkable',
      text: (
        <Fragment>
          <p>
            <strong>WuiCheckableCard</strong> wraps an <strong>WuiRadio</strong>{' '}
            or <strong>WuiCheckbox</strong> with a more-prominent panel,
            allowing for children to be displayed.
          </p>
          <WuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                When used as a radio group, you must provide a{' '}
                <WuiCode>fieldset</WuiCode> with a <WuiCode>legend</WuiCode> for
                accessibility.
              </span>
            }
          />
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardCheckableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardCheckableHtml,
        },
      ],
      props: {
        WuiCheckableCard,
      },
      demo: <CardCheckable />,
    },
    {
      title: 'Custom children',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardChildrenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardChildrenHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            In the event that you need more than just paragraph text for the
            description, you can pass anything you need as the{' '}
            <WuiCode>children</WuiCode> of the component.
          </p>
        </Fragment>
      ),
      props: { WuiCard },
      demo: <CardChildren />,
      snippet: `<WuiCard
  textAlign="left"
  title="title"
  description="description">
  <WuiText size="s">
    <ul>
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
    </ul>
  </WuiText>
</WuiCard>`,
    },
    {
      title: 'Plain cards',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardDisplaySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: cardDisplayHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            If you need a card with no borders or shadows pass{' '}
            <WuiCode language="ts">{'display="plain"'}</WuiCode>. This is a good
            option to avoid nested panels. Adding an interaction to the card
            will provide the clickable styling on hover. Note that{' '}
            <WuiCode>plain</WuiCode> display is not available for
            <WuiCode>selectable</WuiCode> cards.
          </p>
          <p>
            For non-interactive cards, reduce or eliminate the padding as needed
            to suit your layout with the prop <WuiCode>paddingSize</WuiCode>.
          </p>
        </Fragment>
      ),
      props: { WuiCard },
      demo: <CardDisplay />,
      snippet: `<WuiCard
  title="title"
  description="description" 
  display="plain"
/>`,
    },
  ],
  playground: cardConfig,
};
