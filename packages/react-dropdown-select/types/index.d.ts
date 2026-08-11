import React from 'react';
import { SelectProps } from './select-types';
type SelectRef = {
    state: any;
    methods: any;
};
declare const Select: (<T extends Record<string, any>>(props: SelectProps<T> & {
    ref?: React.ForwardedRef<SelectRef>;
}) => JSX.Element) & {
    defaultProps: Partial<SelectProps<any>>;
};
export { Select };
export default Select;
