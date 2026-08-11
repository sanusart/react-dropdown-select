import React, { Component, RefObject } from 'react';
import { SelectProps, SelectState, SelectMethods } from '../select-types';
interface InputProps<T> {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
}
declare class Input<T extends Record<string, any>> extends Component<InputProps<T>> {
    input: RefObject<HTMLInputElement>;
    componentDidUpdate(prevProps: InputProps<T>): void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => any;
    render(): JSX.Element | null;
}
export default Input;
