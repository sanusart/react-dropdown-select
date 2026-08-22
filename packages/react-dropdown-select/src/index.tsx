import React, { forwardRef, useImperativeHandle, type ReactElement } from 'react';
import ClickOutside from './components/ClickOutside';

import Content from './components/Content';
import Loading from './components/Loading';
import Clear from './components/Clear';
import Separator from './components/Separator';
import DropdownHandle from './components/DropdownHandle';

import { isEqual } from './util';
import { LIB_NAME } from './constants';
import { SelectProps } from './select-types';
import { useSelect } from './hooks/useSelect';

function SelectInner<T extends Record<string, any>>(
  rawProps: SelectProps<T>,
  ref: React.ForwardedRef<{ state: any; methods: any }>,
) {
  const props = React.useMemo(() => {
    const merged = { ...rawProps } as SelectProps<T>;
    (Object.keys(defaultProps) as (keyof SelectProps<any>)[]).forEach((key) => {
      if (merged[key] === undefined) {
        merged[key] = defaultProps[key] as any;
      }
    });
    return merged;
  }, [rawProps]);

  const { state, methods, selectRef, renderDropdown, setState, handleKeyDownFn } = useSelect(props);

  useImperativeHandle(
    ref,
    () => ({ state, methods, setState, props, handleKeyDownFn, ...methods }),
    [state, methods, setState, props, handleKeyDownFn],
  );

  return (
    <ClickOutside onClickOutside={(event) => methods.dropDown('close', event as React.MouseEvent)}>
      <div
        onKeyDown={methods.handleKeyDown}
        aria-label="Dropdown select"
        aria-expanded={state.dropdown}
        onClick={(event) => methods.dropDown('open', event)}
        tabIndex={props.disabled ? -1 : 0}
        ref={selectRef}
        className={`${props.disabled ? `${LIB_NAME}-disabled` : ''} ${LIB_NAME} ${
          props.className || ''
        }`}
        {...props.additionalProps}>
        <Content props={props} state={state} methods={methods} />

        {(props.name || props.required) && (
          <input
            tabIndex={-1}
            className={`${LIB_NAME}-hidden-input`}
            name={props.name || ''}
            required={props.required}
            pattern={props.pattern}
            defaultValue={
              state.values.map((value: any) => value[props.labelField!]).toString() || ''
            }
            disabled={props.disabled}
          />
        )}

        {props.loading && <Loading props={props} />}

        {props.clearable && <Clear props={props} state={state} methods={methods} />}

        {props.separator && <Separator props={props} state={state} methods={methods} />}

        {props.dropdownHandle && (
          <DropdownHandle
            onClick={() => selectRef.current!.focus()}
            props={props}
            state={state}
            methods={methods}
          />
        )}

        {state.dropdown && !props.disabled && renderDropdown()}
      </div>
    </ClickOutside>
  );
}

type SelectRef = {
  state: any;
  methods: any;
};

const Select = forwardRef(SelectInner) as <T extends Record<string, any>>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<SelectRef> },
) => ReactElement;

export const defaultProps: Partial<SelectProps<any>> = {
  addPlaceholder: '',
  additionalProps: undefined,
  autoFocus: false,
  backspaceDelete: true,
  clearAllLabel: 'Clear all',
  clearOnBlur: true,
  clearOnSelect: true,
  clearable: false,
  closeOnScroll: false,
  closeOnSelect: false,
  closeOnClickInput: false,
  color: '#0074D9',
  compareValuesFunc: isEqual,
  create: false,
  createNewLabel: 'add {search}',
  debounceDelay: 0,
  direction: 'ltr',
  disabled: false,
  disabledLabel: 'disabled',
  dropdownGap: 5,
  dropdownHandle: true,
  dropdownHeight: '300px',
  dropdownPosition: 'bottom',
  handleKeyDownFn: () => undefined,
  keepOpen: false,
  keepSelectedInList: true,
  labelField: 'label',
  loading: false,
  multi: false,
  name: null,
  noDataLabel: 'No data',
  onChange: () => undefined,
  onSelect: () => undefined,
  onDeselect: () => undefined,
  onClearAll: () => undefined,
  onCreateNew: () => undefined,
  onDropdownClose: () => undefined,
  onDropdownCloseRequest: undefined,
  onDropdownOpen: () => undefined,
  onSelectAll: () => undefined,
  options: [],
  pattern: undefined,
  placeholder: 'Select...',
  portal: undefined,
  required: false,
  searchBy: 'label',
  searchFn: () => undefined as any,
  searchable: true,
  selectAll: false,
  selectAllLabel: 'Select all',
  separator: false,
  sortBy: null,
  styleNonce: undefined,
  valueField: 'value',
  values: [],
  defaultMenuIsOpen: false,
};

export { Select };
export default Select;
