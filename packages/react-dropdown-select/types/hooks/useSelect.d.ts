import React from 'react';
import { SelectProps, SelectState, SelectMethods, HandleKeyDownArgs } from '../select-types';
interface SelectComponentState<T> extends SelectState<T> {
    searchResults: T[];
}
export declare function useSelect<T extends Record<string, any>>(props: SelectProps<T>): {
    state: SelectComponentState<T>;
    methods: SelectMethods<T>;
    selectRef: React.RefObject<HTMLDivElement>;
    dropdownRoot: false | HTMLDivElement;
    renderDropdown: () => React.JSX.Element;
    setState: (updater: Partial<SelectComponentState<T>> | ((prev: SelectComponentState<T>) => Partial<SelectComponentState<T>>)) => void;
    handleKeyDownFn: ({ event, state: s, props: p, methods: m, setState: sSet }: HandleKeyDownArgs<T>) => void | null;
};
export {};
