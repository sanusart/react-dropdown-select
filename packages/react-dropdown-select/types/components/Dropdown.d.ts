import React from 'react';
import { SelectProps, SelectState, SelectMethods } from '../select-types';
interface DropdownProps<T> {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
}
declare const Dropdown: <T extends Record<string, any>>({ props, state, methods }: DropdownProps<T>) => React.JSX.Element;
export default Dropdown;
