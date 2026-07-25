import { CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent, RefObject, ChangeEvent } from 'react';
export interface SelectState<T> {
    dropdown: boolean;
    values: T[];
    search: string;
    selectBounds: DOMRect | Record<string, never>;
    cursor: number | null;
    searchResults: T[];
    activeCursorItem?: any;
}
export interface SelectMethods<T> {
    activeCursorItem: (item: any) => void;
    addItem: (item: T) => void;
    areAllSelected: () => boolean;
    clearAll: () => void;
    createNew: (item: string) => void;
    dropDown: (action: string, event?: React.MouseEvent | React.KeyboardEvent | null, force?: boolean) => void | false;
    getInputSize: () => number;
    getSelectBounds: () => DOMRect | Record<string, never>;
    getSelectRef: () => HTMLDivElement | null;
    handleKeyDown: (event: KeyboardEvent) => void;
    isSelected: (item: T) => boolean;
    removeItem: (event: MouseEvent<HTMLElement> | null, item: T, close?: boolean) => void;
    safeString: (input: string) => string;
    searchResults: () => T[];
    selectAll: (valuesList?: T[]) => void;
    setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    sortBy: () => T[];
    toggleSelectAll: () => void;
}
export interface SelectProps<T> {
    backspaceDelete?: boolean;
    className?: string;
    addPlaceholder?: string;
    placeholder?: string;
    loading?: boolean;
    style?: CSSProperties;
    values?: T[];
    options?: T[];
    multi?: boolean;
    disabled?: boolean;
    searchBy?: string;
    sortBy?: string | null;
    clearable?: boolean;
    searchable?: boolean;
    dropdownHandle?: boolean;
    separator?: boolean;
    keepOpen?: boolean;
    noDataLabel?: string;
    createNewLabel?: string;
    disabledLabel?: string;
    dropdownGap?: number;
    closeOnScroll?: boolean;
    debounceDelay?: number;
    labelField?: string;
    valueField?: string;
    color?: string;
    keepSelectedInList?: boolean;
    closeOnSelect?: boolean;
    closeOnClickInput?: boolean;
    clearOnBlur?: boolean;
    clearOnSelect?: boolean;
    dropdownPosition?: 'top' | 'bottom' | 'auto';
    dropdownHeight?: string;
    autoFocus?: boolean;
    portal?: HTMLElement;
    create?: boolean;
    direction?: 'ltr' | 'rtl';
    name?: string | null;
    required?: boolean;
    pattern?: string;
    defaultMenuIsOpen?: boolean;
    onChange?: (value: T[]) => void;
    onSelect?: (value: T[]) => void;
    onDeselect?: (value: T[]) => void;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    onClearAll?: () => void;
    clearAllLabel?: string;
    onSelectAll?: () => void;
    onCreateNew?: (item: T) => void;
    onDropdownCloseRequest?: (args: {
        props: SelectProps<T>;
        state: SelectState<T>;
        methods: SelectMethods<T>;
        close: () => void;
    }) => void;
    searchFn?: (args: RendererArgs<T>) => T[];
    handleKeyDownFn?: (args: HandleKeyDownArgs<T>) => void;
    clearRenderer?: (args: RendererArgs<T>) => JSX.Element;
    contentRenderer?: (args: RendererArgs<T>) => JSX.Element;
    dropdownRenderer?: (args: RendererArgs<T>) => JSX.Element;
    dropdownHandleRenderer?: (args: RendererArgs<T>) => JSX.Element;
    inputRenderer?: (args: InputRendererArgs<T>) => JSX.Element;
    itemRenderer?: (args: ItemRendererArgs<T>) => JSX.Element;
    loadingRenderer?: (args: {
        props: SelectProps<T>;
    }) => JSX.Element;
    noDataRenderer?: (args: RendererArgs<T>) => JSX.Element;
    optionRenderer?: (args: ItemRendererArgs<T>) => JSX.Element;
    separatorRenderer?: (args: RendererArgs<T>) => JSX.Element;
    additionalProps?: HTMLAttributes<HTMLDivElement>;
    wrapperClassName?: string;
    selectAll?: boolean;
    selectAllLabel?: string;
    compareValuesFunc?: (a: T[], b: T[]) => boolean;
}
export interface RendererArgs<T> {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
}
export interface InputRendererArgs<T> extends RendererArgs<T> {
    inputRef: RefObject<HTMLInputElement>;
}
export interface ItemRendererArgs<T> {
    item: T;
    itemIndex?: number;
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
}
export interface HandleKeyDownArgs<T> {
    event: KeyboardEvent;
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
    setState: React.Dispatch<React.SetStateAction<any>>;
}
export interface ClickOutsideProps {
    onClickOutside: (event: React.MouseEvent | MouseEvent) => void;
    children: React.ReactNode;
    className?: string;
}
export interface ComponentRendererArgs<T> {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
}
