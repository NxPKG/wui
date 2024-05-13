import React, { useState, useEffect } from 'react';
import { assertUnreachable, PropTypes } from 'react-view';
import {
  WuiSpacer,
  WuiSwitch,
  WuiRadioGroup,
  WuiFieldText,
  WuiCode,
  WuiSelect,
  WuiFieldNumber,
  WuiToolTip,
  WuiTable,
  WuiTableBody,
  WuiTableHeader,
  WuiTableHeaderCell,
  WuiTableRow,
  WuiTableRowCell,
  WuiTextColor,
  WuiTextArea,
  WuiFormRow,
} from '../../../../src/components/';

import {
  humanizeType,
  markup,
} from '../../components/guide_section/guide_section';

const getTooltip = (description, type, name) => (
  <span>
    <p>
      <b>{name}</b>: <i>{type}</i>
    </p>
    <p>{description}</p>
  </span>
);

const Label = ({ children, tooltip }) => {
  return (
    <WuiToolTip position="top" content={tooltip}>
      <>
        <span>{children}</span>
        <WuiSpacer size="s" />
      </>
    </WuiToolTip>
  );
};

const Knob = ({
  name,
  error: errorMsg,
  type,
  defaultValue,
  val,
  set,
  options = {},
  description,
  placeholder,
  custom,
  state,
  hidden,
}) => {
  const [error, setError] = useState(errorMsg);

  useEffect(() => {
    if (custom && custom.checkDep) {
      setError(custom.checkDep(val, state));
    }
  }, [state, val, custom]);

  let knobProps = {};
  switch (type) {
    case PropTypes.Ref:
      return (
        <>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <a
            href="https://reactjs.org/docs/refs-and-the-dom.html"
            target="_blank"
            style={{
              fontSize: '14px',
              display: 'block',
            }}>
            React Ref documentation
          </a>
          {error && <div>error {error}</div>}
        </>
      );

    case PropTypes.Number:
      return (
        <WuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          fullWidth>
          <WuiFieldNumber
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={e => set(e.target.value)}
            aria-label={description}
            compressed
            fullWidth
            isInvalid={error && error.length > 0}
          />
        </WuiFormRow>
      );

    case PropTypes.String:
    case PropTypes.Date:
      if (custom && custom.validator) {
        knobProps = {};
        knobProps.onChange = e => {
          const value = e.target.value;
          if (custom.validator(value)) set(value);
          else set(undefined);
        };
      } else if (custom && custom.sanitize) {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = e => {
          const value = e.target.value;
          set(custom.sanitize(value));
        };
      } else {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = e => {
          const value = e.target.value;
          set(value);
        };
      }

      return (
        <WuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          fullWidth
          helpText={custom && custom.helpText}>
          <WuiFieldText
            placeholder={placeholder}
            aria-label={description}
            isInvalid={error && error.length > 0}
            compressed
            fullWidth
            {...knobProps}
          />
        </WuiFormRow>
      );

    case PropTypes.Boolean:
      return (
        <>
          <WuiSwitch
            id={name}
            label=""
            checked={val}
            onChange={e => {
              set(e.target.checked);
            }}
            compressed
          />
          {error && <div>error {error}</div>}
        </>
      );

    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;

      let valueKey = val || defaultValue;

      if (numberOfOptions < 1) {
        if (valueKey && !valueKey.includes('__')) {
          valueKey = `${valueKey}__${name}`;
        }
        const flattenedOptions = optionsKeys.map(key => ({
          id: `${key}__${name}`,
          label: options[key],
        }));

        return (
          <>
            <WuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={id => {
                let val = id;
                if (val.includes('__')) val = val.split('__')[0];
                set(val);
              }}
              name={`Select ${name}`}
            />
            {error && <div>error {error}</div>}
          </>
        );
      } else {
        const flattenedOptions = optionsKeys.map(key => ({
          value: key,
          text: options[key],
        }));

        return (
          <WuiFormRow
            isInvalid={error && error.length > 0}
            error={error}
            fullWidth>
            <WuiSelect
              id={name}
              options={flattenedOptions}
              value={valueKey || defaultValue}
              onChange={e => {
                set(e.target.value);
              }}
              aria-label={`Select ${name}`}
              isInvalid={error && error.length > 0}
              compressed
              fullWidth
            />
          </WuiFormRow>
        );
      }

    case PropTypes.ReactNode:
      if (name === 'children' && !hidden) {
        return (
          <WuiTextArea
            placeholder={placeholder}
            value={val}
            onChange={e => {
              set(e.target.value);
            }}
          />
        );
      } else return null;

    case PropTypes.Custom:
      if (custom && custom.use) {
        switch (custom.use) {
          case 'switch':
            return (
              <>
                <WuiSwitch
                  id={name}
                  label={custom.label || ''}
                  checked={typeof val !== 'undefined' && val}
                  onChange={e => {
                    const value = e.target.checked;

                    set(value ? value : undefined);
                  }}
                  compressed
                />
              </>
            );
        }
      }

    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
      return null;
    default:
      return assertUnreachable();
  }
};

const KnobColumn = ({ state, knobNames, error, set }) => {
  return (
    <>
      {knobNames.map((name, idx) => {
        let humanizedType;

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.type
        )
          humanizedType = humanizeType(state[name].custom.origin.type);

        const typeMarkup = humanizedType && (
          <WuiCode>
            <span className="wui-textBreakNormal">{markup(humanizedType)}</span>
          </WuiCode>
        );

        let humanizedName = (
          <strong className="wui-textBreakNormal">{name}</strong>
        );

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.required
        ) {
          humanizedName = (
            <span>
              {humanizedName}{' '}
              <WuiTextColor color="danger">(required)</WuiTextColor>
            </span>
          );
        }

        let defaultValueMarkup;

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.defaultValue
        ) {
          defaultValueMarkup = (
            <WuiCode key={`defaultValue-${name}`}>
              <span className="wui-textBreakNormal">
                {state[name].custom.origin.defaultValue.value}
              </span>
            </WuiCode>
          );
        }

        return (
          <WuiTableRow key={name}>
            <WuiTableRowCell
              key={`prop__${name}-${idx}`}
              header="Prop"
              className="playgroundKnobs__rowCell">
              {humanizedName}
              {state[name].description && (
                <>
                  <br />
                  <>{markup(state[name].description)}</>
                </>
              )}
            </WuiTableRowCell>
            <WuiTableRowCell
              key={`type__${name}-${idx}`}
              header="Type"
              className="playgroundKnobs__rowCell">
              {typeMarkup}
            </WuiTableRowCell>
            <WuiTableRowCell
              key={`default__${name}-${idx}`}
              header="Default"
              className="playgroundKnobs__rowCell">
              {defaultValueMarkup}
            </WuiTableRowCell>
            <WuiTableRowCell
              key={`modify__${name}-${idx}`}
              header="Modify"
              textOnly={false}
              className="playgroundKnobs__rowCell">
              <Knob
                key={name}
                name={name}
                error={error.where === name ? error.msg : null}
                description={state[name].description}
                type={state[name].type}
                val={state[name].value}
                hidden={state[name].hidden}
                options={state[name].options}
                placeholder={state[name].placeholder}
                set={value => set(value, name)}
                enumName={state[name].enumName}
                defaultValue={state[name].defaultValue}
                custom={state[name] && state[name].custom}
                state={state}
                orgSet={set}
              />
            </WuiTableRowCell>
          </WuiTableRow>
        );
      })}
    </>
  );
};

const columns = [
  {
    field: 'prop',
    name: 'Prop',
    sortable: true,
    'data-test-subj': 'PropCell',
  },
  {
    field: 'type',
    name: 'Type',
  },
  {
    field: 'default',
    name: 'Default',
  },
  {
    field: 'modify',
    name: 'Modify',
  },
];

const Knobs = ({ state, set, error }) => {
  const knobNames = Object.keys(state);

  return (
    <WuiTable compressed id={'playground__ID'}>
      <WuiTableHeader>
        {columns.map(({ name }, id) => {
          return <WuiTableHeaderCell key={id}>{name}</WuiTableHeaderCell>;
        })}
      </WuiTableHeader>

      <WuiTableBody>
        <KnobColumn
          state={state}
          knobNames={knobNames}
          set={set}
          error={error}
        />
      </WuiTableBody>
    </WuiTable>
  );
};

export default Knobs;
