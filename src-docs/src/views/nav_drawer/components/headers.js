import React, { useState } from 'react';
import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiHeader,
  WuiHeaderSection,
  WuiHeaderSectionItem,
  WuiHeaderBreadcrumbs,
  WuiHeaderLogo,
  WuiHeaderSectionItemButton,
  WuiIcon,
  WuiShowFor,
  WuiFormRow,
  WuiButtonToggle,
  WuiToolTip,
  WuiButtonIcon,
  WuiButtonEmpty,
} from '../../../../../src/components';
import classNames from 'classnames';
import DatePicker from './datepicker';
import MultiSelect from './multi_select';
import Searchbar from './searchbar';
import Notice from './notice';

export default ({ isNavDrawerLocked, navDrawerRef }) => {
  const [toggleAdvanced, setToggleAdvanced] = useState(false);

  const onToggleAdvancedChange = e => setToggleAdvanced(e.target.checked);

  const headerClasses = classNames(
    { 'wuiNavDrawer--expanded': isNavDrawerLocked },
    { 'wuiHeader--collapsed': !toggleAdvanced }
  );

  const renderLogo = () => (
    <WuiHeaderLogo
      iconType="logoWazuh"
      href="#/layout/nav-drawer"
      aria-label="Goes to home"
    />
  );

  const renderMenuTrigger = () => (
    <WuiHeaderSectionItemButton
      aria-label="Open nav"
      onClick={() => navDrawerRef.current.toggleOpen()}>
      <WuiIcon type="apps" href="#" size="m" />
    </WuiHeaderSectionItemButton>
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked management');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Agents',
        href: '#',
        onClick: e => {
          e.preventDefault();
        },
      },
      {
        text: 'Create',
      },
    ];

    return <WuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  };

  return (
    <>
      <WuiHeader position="fixed">
        <WuiHeaderSection grow={false}>
          <WuiShowFor sizes={['xs', 's']}>
            <WuiHeaderSectionItem border="right">
              {renderMenuTrigger()}
            </WuiHeaderSectionItem>
          </WuiShowFor>
          <WuiHeaderSectionItem border="right">
            {renderLogo()}
          </WuiHeaderSectionItem>
          <WuiHeaderSectionItem border="right">
            {renderBreadcrumbs()}
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
        {/* Basic filters */}
        <WuiHeaderSection grow={false}>
          <WuiHeaderSectionItem>
            {!toggleAdvanced ? (
              <WuiFlexGroup gutterSize="xs" justifyContent="spaceEvenly">
                <WuiFlexItem grow={false}>
                  <WuiFormRow display="rowCompressed">
                    <MultiSelect />
                  </WuiFormRow>
                </WuiFlexItem>
                <WuiFlexItem grow={false}>
                  <WuiFormRow display="rowCompressed">
                    <MultiSelect />
                  </WuiFormRow>
                </WuiFlexItem>
              </WuiFlexGroup>
            ) : (
              <></>
            )}
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
        <WuiHeaderSection grow={false}>
          <WuiHeaderSectionItem>
            {!toggleAdvanced ? (
              <WuiFlexGroup gutterSize="l">
                <WuiFlexItem grow={false}>
                  <WuiFormRow display="rowCompressed">
                    <DatePicker />
                  </WuiFormRow>
                </WuiFlexItem>
              </WuiFlexGroup>
            ) : (
              <></>
            )}
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
        {/**** Notifications ****/}
        <WuiHeaderSection grow={false}>
          {/**** Advanced button ****/}
          <WuiHeaderSectionItem>
            <WuiFormRow display="rowCompressed">
              <WuiToolTip content="Advanced search">
                <Notice active={true} top={45} right={3}>
                  <WuiButtonToggle
                    iconType="controlsHorizontal"
                    label={'Advanced'}
                    aria-label={'Advanced'}
                    fill={toggleAdvanced}
                    onChange={onToggleAdvancedChange}
                    isSelected={toggleAdvanced}
                    size={'s'}
                  />
                </Notice>
              </WuiToolTip>
            </WuiFormRow>
          </WuiHeaderSectionItem>
          <WuiHeaderSectionItem>
            <WuiFormRow display="rowCompressed">
              <WuiToolTip content="Notifications">
                <Notice active={true} top={20} right={21}>
                  <WuiButtonIcon
                    iconType="bell"
                    aria-label={'Notifications'}
                    label={'Notifications'}
                    color="primary"
                    size={'m'}
                    iconSize={'s'}
                  />
                </Notice>
              </WuiToolTip>
            </WuiFormRow>
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
      </WuiHeader>
      {/**** Advanced Filtering Navbar ****/}
      <WuiHeader position="fixed" className={headerClasses}>
        <WuiHeaderSection grow>
          <WuiHeaderSectionItem grow>
            <Searchbar />
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
      </WuiHeader>
      {/**** Selected Items Navbar ****/}
      <WuiHeader position="fixed" className={headerClasses}>
        <WuiHeaderSection grow={false}>
          <WuiHeaderSectionItem>
            <WuiToolTip content="Add filter">
              <WuiButtonIcon
                size="s"
                aria-label="Add filter"
                iconType="plusInCircle"
              />
            </WuiToolTip>
            <WuiButtonEmpty>agent.name: Windows 3.11</WuiButtonEmpty>
            <WuiButtonIcon
              size="s"
              aria-label="Remove filter"
              iconType="cross"
            />
            <WuiButtonEmpty>rule.level: 14</WuiButtonEmpty>
            <WuiButtonIcon
              size="s"
              aria-label="Remove filter"
              iconType="cross"
            />
          </WuiHeaderSectionItem>
        </WuiHeaderSection>
      </WuiHeader>
    </>
  );
};
