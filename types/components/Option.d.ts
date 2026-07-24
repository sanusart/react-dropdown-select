import { ItemRendererArgs } from '../select-types';
declare const Option: <T extends Record<string, any>>({ item, props, state, methods }: ItemRendererArgs<T>) => JSX.Element;
export default Option;
