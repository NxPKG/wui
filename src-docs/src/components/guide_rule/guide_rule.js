import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WuiFlexGroup } from '../../../../src/components';

import { GuideRuleDescription } from './guide_rule_description';

export const GuideRule = ({
  children,
  className,
  heading,
  description,
  ...rest
}) => {
  const classes = classNames(
    'guideRule',
    {
      'guideRule--hasHeading': heading,
      'guideRule--hasDescription': description,
    },
    className
  );

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <GuideRuleDescription heading={heading} description={description} />
    );
  }

  return (
    <div className={classes} {...rest}>
      {descriptionNode}

      <WuiFlexGroup className="guideRule__exampleRow" gutterSize="xl" wrap>
        {children}
      </WuiFlexGroup>
    </div>
  );
};

GuideRule.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};
