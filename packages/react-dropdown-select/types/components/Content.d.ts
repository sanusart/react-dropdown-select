import React from 'react';
import { ComponentRendererArgs } from '../select-types';
declare const Content: <T extends Record<string, any>>({ props, state, methods, }: ComponentRendererArgs<T>) => React.JSX.Element;
export default Content;
