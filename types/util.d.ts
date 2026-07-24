import { SelectProps } from './select-types';
export declare const valueExistInSelected: <T extends Record<string, any>>(value: any, values: T[], props: SelectProps<T>) => boolean;
export declare const hexToRGBA: (hex: string, alpha?: number) => string;
export declare const debounce: <T extends (...args: any[]) => void>(fn: T, delay?: number) => (...args: Parameters<T>) => void;
export declare const isEqual: (a: any, b: any) => boolean;
export declare const getByPath: (object: any, path?: string) => any;
export declare const getProp: (object: any, path?: string | string[], defaultValue?: any) => any;
export declare const isomorphicWindow: () => Window & typeof globalThis;
