import React, { useRef, useCallback, useMemo, useEffect, useLayoutEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../components/Dropdown';
import { registerStyle, unregisterStyle } from '../styles';
import {
  debounce,
  getByPath,
  getProp,
  hexToRGBA,
  valueExistInSelected,
  isomorphicWindow,
} from '../util';
import { SelectProps, SelectState, SelectMethods, HandleKeyDownArgs } from '../select-types';

let styleIdCounter = 0;

const getInstanceStyle = <T extends Record<string, any>>(
  id: string,
  props: SelectProps<T>,
): string => {
  const color = props.color || '#0074D9';
  const shadow = hexToRGBA(color, 0.2);
  const hover = hexToRGBA(color, 0.1);

  return `[data-rdrs="${id}"] {
  --select-direction: ${props.direction || 'ltr'};
  --select-color: ${color};
  --select-color-shadow: ${shadow};
  --select-handle-color: ${color};
  --select-loading-color: ${color};
  --select-option-color: ${color};
  --select-option-direction: ${props.direction === 'rtl' ? 'row-reverse' : 'row'};
  --select-item-active-bg: ${hover};
  --select-item-hover-bg: ${hover};
  --select-item-selected-bg: ${color};
  --select-item-selected-color: #fff;
}`;
};

interface SelectComponentState<T> extends SelectState<T> {
  searchResults: T[];
}

type Action<T> =
  | { type: 'BATCH'; payload: Partial<SelectComponentState<T>> }
  | { type: 'FUNCTIONAL'; fn: (prev: SelectComponentState<T>) => Partial<SelectComponentState<T>> };

function reducer<T>(state: SelectComponentState<T>, action: Action<T>): SelectComponentState<T> {
  if (action.type === 'BATCH') return { ...state, ...action.payload };
  return { ...state, ...action.fn(state) };
}

const initialiseState = <T extends Record<string, any>>(
  props: SelectProps<T>,
): SelectComponentState<T> => ({
  dropdown: false,
  values: (props.values || []) as T[],
  search: '',
  selectBounds: {} as DOMRect,
  cursor: null,
  searchResults: (props.options || []) as T[],
});

export function useSelect<T extends Record<string, any>>(props: SelectProps<T>) {
  const [state, dispatch] = useReducer(reducer<T>, props, initialiseState);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRootRef = useRef<HTMLDivElement | false>(
    typeof document !== 'undefined' && document.createElement('div'),
  );

  const styleIdRef = useRef<string | null>(null);
  if (styleIdRef.current === null) {
    styleIdRef.current = `rdrs-${++styleIdCounter}`;
  }
  const instanceStyle = useMemo(
    () => getInstanceStyle(styleIdRef.current!, props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.color, props.direction],
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  const propsRef = useRef(props);
  propsRef.current = props;

  const prevPropsValuesRef = useRef(props.values);
  const prevDropdownRef = useRef(false);
  const controlledUpdateRef = useRef(false);
  const isFirstRenderRef = useRef(true);

  const setState = useCallback(
    (
      updater:
        | Partial<SelectComponentState<T>>
        | ((prev: SelectComponentState<T>) => Partial<SelectComponentState<T>>),
    ) => {
      if (typeof updater === 'function') {
        dispatch({ type: 'FUNCTIONAL', fn: updater });
      } else {
        dispatch({ type: 'BATCH', payload: updater });
      }
    },
    [],
  );

  const updateSelectBounds = useCallback(() => {
    if (selectRef.current) {
      setState({ selectBounds: selectRef.current.getBoundingClientRect() });
    }
  }, [setState]);

  const dropDown = useCallback(
    (action = 'toggle', event?: React.MouseEvent | React.KeyboardEvent | null, force = false) => {
      const p = propsRef.current;
      const s = stateRef.current;
      const target =
        (event && (event.target as HTMLElement)) || (event && (event as any).srcElement);

      if (
        p.onDropdownCloseRequest !== undefined &&
        s.dropdown &&
        force === false &&
        action === 'close'
      ) {
        return p.onDropdownCloseRequest({
          props: p,
          methods: methodsRef.current,
          state: s,
          close: () => dropDown('close', null, true),
        });
      }

      if (
        p.portal &&
        !p.closeOnScroll &&
        !p.closeOnSelect &&
        event &&
        target &&
        (target as HTMLElement).offsetParent &&
        (target as HTMLElement).offsetParent!.classList.contains('react-dropdown-select-dropdown')
      ) {
        return;
      }

      if (p.keepOpen) {
        return setState({ dropdown: true });
      }

      if (action === 'close' && s.dropdown) {
        selectRef.current!.blur();
        return setState({
          dropdown: false,
          search: p.clearOnBlur ? '' : s.search,
          searchResults: p.options || [],
        });
      }

      if (action === 'open' && !s.dropdown) {
        return setState({ dropdown: true });
      }

      if (action === 'toggle') {
        selectRef.current!.focus();
        return setState({ dropdown: !s.dropdown });
      }
    },
    [setState],
  );

  const dropDownRef = useRef(dropDown);
  dropDownRef.current = dropDown;

  const safeString = useCallback(
    (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    [],
  );

  const sortByFn = useCallback(() => {
    const { sortBy: sortKey, options } = propsRef.current;
    if (!sortKey) return options || [];
    const sorted = [...(options || [])];
    sorted.sort((a: any, b: any) => {
      if (getProp(a, sortKey) < getProp(b, sortKey)) return -1;
      if (getProp(a, sortKey) > getProp(b, sortKey)) return 1;
      return 0;
    });
    return sorted;
  }, []);

  const searchFn = useCallback(
    ({ state: s, methods: m }: { state: SelectState<T>; methods: SelectMethods<T> }) => {
      const regexp = new RegExp(m.safeString(s.search), 'i');
      return m
        .sortBy()
        .filter((item: any) =>
          regexp.test(
            getByPath(item, propsRef.current.searchBy) ||
              getByPath(item, propsRef.current.valueField),
          ),
        );
    },
    [],
  );

  const searchResultsFn = useCallback(() => {
    const s = stateRef.current;
    const m = methodsRef.current;
    const p = propsRef.current;
    const args = { state: s, props: p, methods: m };
    return (p.searchFn!(args) || searchFn({ state: s, methods: m })) as T[];
  }, [searchFn]);

  const isSelected = useCallback(
    (option: T) =>
      !!stateRef.current.values.find((value: T) => {
        const p = propsRef.current;
        return getByPath(value, p.valueField) === getByPath(option, p.valueField);
      }),
    [],
  );

  const areAllSelected = useCallback(
    () =>
      stateRef.current.values.length ===
      (propsRef.current.options || []).filter((option: any) => !option.disabled).length,
    [],
  );

  const clearAll = useCallback(() => {
    propsRef.current.onClearAll!();
    setState({ values: [] });
    return [];
  }, [setState]);

  const selectAll = useCallback(
    (valuesList: T[] = []) => {
      propsRef.current.onSelectAll!();
      const values =
        valuesList.length > 0
          ? valuesList
          : (propsRef.current.options || []).filter((option: any) => !option.disabled);
      setState({ values });
      return values;
    },
    [setState],
  );

  const removeItemFn = useCallback(
    (event: React.MouseEvent<HTMLElement> | null, item: T, close = false) => {
      const p = propsRef.current;
      const s = stateRef.current;

      if (event && close) {
        event.preventDefault();
        event.stopPropagation();
        dropDownRef.current('close');
      }

      const values = s.values.filter(
        (v: T) => getByPath(v, p.valueField) !== getByPath(item, p.valueField),
      );
      setState({ values });
      p.onDeselect!(values);
    },
    [setState],
  );

  const removeItemRef = useRef(removeItemFn);
  removeItemRef.current = removeItemFn;

  const searchResultsRef = useRef(searchResultsFn);
  searchResultsRef.current = searchResultsFn;

  const addItem = useCallback(
    (item: T) => {
      const p = propsRef.current;
      const s = stateRef.current;

      if (p.multi) {
        if (valueExistInSelected(getByPath(item, p.valueField), s.values, p)) {
          return removeItemRef.current(null, item, false);
        }
        setState({ values: [...s.values, item] });
        p.onSelect!([...s.values, item]);
      } else {
        setState({ values: [item], dropdown: false });
        p.onSelect!([item]);
      }

      if (p.clearOnSelect) {
        const m = methodsRef.current;
        const clearedState = { ...stateRef.current, search: '' };
        const args = { state: clearedState, props: p, methods: m };
        const newSearchResults = (p.searchFn!(args) ||
          searchFn({ state: clearedState, methods: m })) as T[];
        setState({ search: '', searchResults: newSearchResults });
      }

      return true;
    },
    [setState, searchFn],
  );

  const setSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = event.target.value;
      const m = methodsRef.current;
      const p = propsRef.current;
      const newState = { ...stateRef.current, search: newSearch };
      const args = { state: newState, props: p, methods: m };
      const newSearchResults = (p.searchFn!(args) ||
        searchFn({ state: newState, methods: m })) as T[];
      setState({ cursor: null, search: newSearch, searchResults: newSearchResults });
    },
    [setState, searchFn],
  );

  const getInputSize = useCallback(() => {
    const s = stateRef.current;
    const p = propsRef.current;
    if (s.search) return s.search.length;
    if (s.values.length > 0) return (p.addPlaceholder || '').length;
    return (p.placeholder || '').length;
  }, []);

  const toggleSelectAll = useCallback(() => {
    return setState({
      values: stateRef.current.values.length === 0 ? selectAll() : (clearAll() as any),
    });
  }, [setState, selectAll, clearAll]);

  const getSelectBounds = useCallback(() => stateRef.current.selectBounds, []);
  const getSelectRef = useCallback(() => selectRef.current, []);

  const activeCursorItem = useCallback(
    (item: any) => setState({ activeCursorItem: item }),
    [setState],
  );

  const onDropdownClose = useCallback(() => {
    setState({ cursor: null });
    propsRef.current.onDropdownClose!();
  }, [setState]);

  const onScroll = useCallback(() => {
    const p = propsRef.current;
    if (p.closeOnScroll) {
      dropDownRef.current('close');
    }
    updateSelectBounds();
  }, [updateSelectBounds]);

  const handleKeyDownFn = useCallback(
    ({ event, state: s, props: p, methods: m, setState: sSet }: HandleKeyDownArgs<T>) => {
      const { cursor, searchResults } = s;
      const escape = event.key === 'Escape';
      const enter = event.key === 'Enter';
      const arrowUp = event.key === 'ArrowUp';
      const arrowDown = event.key === 'ArrowDown';
      const backspace = event.key === 'Backspace';
      const tab = event.key === 'Tab' && !event.shiftKey;
      const shiftTab = event.shiftKey && event.key === 'Tab';

      if (arrowDown && !s.dropdown) {
        event.preventDefault();
        dropDownRef.current('open');
        return sSet({ cursor: 0 });
      }

      if ((arrowDown || (tab && s.dropdown)) && cursor === null) {
        return sSet({ cursor: 0 });
      }

      if (arrowUp || arrowDown || (shiftTab && s.dropdown) || (tab && s.dropdown)) {
        event.preventDefault();
      }

      if (escape) {
        dropDownRef.current('close');
      }

      if (enter) {
        const currentItem = searchResults[cursor as number];
        if (currentItem && !(currentItem as any).disabled) {
          if (p.create && valueExistInSelected(s.search, s.values, p)) {
            return null;
          }
          m.addItem(currentItem);
        }
      }

      if ((arrowDown || (tab && s.dropdown)) && searchResults.length === cursor) {
        return sSet({ cursor: 0 });
      }

      if (arrowDown || (tab && s.dropdown)) {
        sSet((prevState: any) => ({
          cursor: (prevState.cursor || 0) + 1,
        }));
      }

      if ((arrowUp || (shiftTab && s.dropdown)) && cursor! > 0) {
        sSet((prevState: any) => ({
          cursor: prevState.cursor! - 1,
        }));
      }

      if ((arrowUp || (shiftTab && s.dropdown)) && cursor === 0) {
        sSet({ cursor: searchResults.length });
      }

      if (backspace && p.backspaceDelete && getInputSize() === 0) {
        setState({ values: stateRef.current.values.slice(0, -1) });
      }
    },
    [getInputSize, setState],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const s = stateRef.current;
      const p = propsRef.current;
      const m = methodsRef.current;
      const args: HandleKeyDownArgs<T> = {
        event,
        state: s,
        props: p,
        methods: m,
        setState,
      };

      if (p.handleKeyDownFn) {
        p.handleKeyDownFn(args);
      } else {
        handleKeyDownFn(args);
      }
    },
    [setState, handleKeyDownFn],
  );

  const createNew = useCallback(
    (item: string) => {
      const p = propsRef.current;
      const newValue = {
        [p.labelField!]: item,
        [p.valueField!]: item,
      } as unknown as T;

      addItem(newValue);
      p.onCreateNew!(newValue);
      setState({ search: '' });
    },
    [addItem, setState],
  );

  const renderDropdown = useCallback(() => {
    const s = stateRef.current;
    const p = propsRef.current;
    const m = methodsRef.current;

    return p.portal ? (
      ReactDOM.createPortal(
        <Dropdown props={p} state={s} methods={m} />,
        dropdownRootRef.current as HTMLDivElement,
      )
    ) : (
      <Dropdown props={p} state={s} methods={m} />
    );
  }, []);

  const methods: SelectMethods<T> = useMemo(
    () => ({
      activeCursorItem,
      addItem,
      areAllSelected,
      clearAll,
      createNew,
      dropDown,
      getInputSize,
      getSelectBounds,
      getSelectRef,
      handleKeyDown,
      isSelected,
      removeItem: removeItemFn,
      safeString,
      searchResults: searchResultsFn,
      selectAll,
      setSearch,
      sortBy: sortByFn,
      toggleSelectAll,
    }),
    [
      activeCursorItem,
      addItem,
      areAllSelected,
      clearAll,
      createNew,
      dropDown,
      getInputSize,
      getSelectBounds,
      getSelectRef,
      handleKeyDown,
      isSelected,
      removeItemFn,
      safeString,
      searchResultsFn,
      selectAll,
      setSearch,
      sortByFn,
      toggleSelectAll,
    ],
  );

  const methodsRef = useRef(methods);
  methodsRef.current = methods;

  useLayoutEffect(() => {
    const styleId = styleIdRef.current!;
    selectRef.current?.setAttribute('data-rdrs', styleId);
    dropdownRootRef.current && dropdownRootRef.current.setAttribute('data-rdrs', styleId);
    registerStyle(styleId, instanceStyle, props.styleNonce);

    return () => {
      unregisterStyle(styleId);
    };
  }, [instanceStyle, props.styleNonce]);

  useLayoutEffect(() => {
    const p = propsRef.current;
    const dropdownRoot = dropdownRootRef.current;
    p.portal && p.portal.appendChild(dropdownRoot as HTMLDivElement);
    isomorphicWindow().addEventListener('resize', debounce(updateSelectBounds));
    isomorphicWindow().addEventListener('scroll', debounce(onScroll));

    dropDownRef.current('close');

    if (selectRef.current) {
      updateSelectBounds();
    }
    if (p.defaultMenuIsOpen) {
      dropDownRef.current('open');
    }

    return () => {
      p.portal && p.portal.removeChild(dropdownRoot as HTMLDivElement);
      isomorphicWindow().removeEventListener('resize', debounce(updateSelectBounds));
      isomorphicWindow().removeEventListener('scroll', debounce(onScroll));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const p = propsRef.current;
    const s = stateRef.current;
    const prevValues = prevPropsValuesRef.current;
    prevPropsValuesRef.current = p.values;

    if (
      !p.compareValuesFunc!(prevValues || [], p.values || []) &&
      p.compareValuesFunc!(prevValues || [], s.values)
    ) {
      controlledUpdateRef.current = true;
      setState({ values: p.values || [] });
      p.onChange!(p.values || []);
      updateSelectBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.values]);

  useEffect(() => {
    setState({ searchResults: searchResultsRef.current() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  useEffect(() => {
    updateSelectBounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.values, state.search]);

  useEffect(() => {
    updateSelectBounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.multi]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (controlledUpdateRef.current) {
      controlledUpdateRef.current = false;
      return;
    }
    const p = propsRef.current;
    p.onChange!(state.values);
    updateSelectBounds();
    if (p.closeOnSelect) {
      dropDownRef.current('close');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.values]);

  useEffect(() => {
    const p = propsRef.current;
    if (state.dropdown) {
      p.onDropdownOpen!();
    } else if (prevDropdownRef.current && !state.dropdown) {
      onDropdownClose();
    }
    prevDropdownRef.current = state.dropdown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dropdown]);

  return {
    state,
    methods,
    selectRef,
    dropdownRoot: dropdownRootRef.current,
    renderDropdown,
    setState,
    handleKeyDownFn,
  };
}
