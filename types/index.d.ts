import React, { Component } from 'react';
import { SelectProps, SelectState, SelectMethods, HandleKeyDownArgs } from './select-types';
interface SelectComponentState<T> extends SelectState<T> {
    searchResults: T[];
}
export declare class Select<T extends Record<string, any>> extends Component<SelectProps<T>, SelectComponentState<T>> {
    methods: SelectMethods<T>;
    select: React.RefObject<HTMLDivElement>;
    dropdownRoot: HTMLDivElement | false;
    static defaultProps: SelectProps<any>;
    constructor(props: SelectProps<T>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SelectProps<T>, prevState: SelectComponentState<T>): void;
    componentWillUnmount(): void;
    onDropdownClose: () => void;
    onScroll: () => void;
    updateSelectBounds: () => void | null;
    getSelectBounds: () => DOMRect | Record<string, never>;
    dropDown: (action?: string, event?: React.MouseEvent | React.KeyboardEvent | null, force?: boolean) => void;
    getSelectRef: () => HTMLDivElement | null;
    addItem: (item: T) => true | void;
    removeItem: (event: React.MouseEvent<HTMLElement> | null, item: T, close?: boolean) => void;
    setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getInputSize: () => number;
    toggleSelectAll: () => void;
    clearAll: () => never[];
    selectAll: (valuesList?: T[]) => T[];
    isSelected: (option: T) => boolean;
    areAllSelected: () => boolean;
    safeString: (string: string) => string;
    sortBy: () => T[];
    searchFn: ({ state, methods }: {
        state: SelectState<T>;
        methods: SelectMethods<T>;
    }) => T[];
    searchResults: () => T[];
    activeCursorItem: (activeCursorItem: any) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
    handleKeyDownFn: ({ event, state, props, methods, setState }: HandleKeyDownArgs<T>) => void | null;
    renderDropdown: () => React.JSX.Element;
    createNew: (item: string) => void;
    render(): React.JSX.Element;
}
export default Select;
