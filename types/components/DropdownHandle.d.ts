import React from 'react';
import { ComponentRendererArgs } from '../select-types';
interface DropdownHandleProps<T> extends ComponentRendererArgs<T> {
    onClick?: () => void;
}
declare const DropdownHandle: <T extends Record<string, any>>({ props, state, methods, onClick }: DropdownHandleProps<T>) => React.JSX.Element;
export default DropdownHandle;
