import type { SelectProps } from '../types';

// A lightweight window-like shape used for SSR-safe access to window properties we need
export type IsomorphicWindow =
  | Window
  | {
      innerHeight: number;
      addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
      removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
    };

// Check for browser window in a universal (SSR) environment
export const isomorphicWindow = (): IsomorphicWindow => {
  // If window is available, return it (cast to IsomorphicWindow so callers can rely on the
  // properties we need). Otherwise return a minimal fallback object matching IsomorphicWindow.
  if (typeof window === 'undefined') {
    return {
      innerHeight: 0,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    };
  }

  return window as unknown as IsomorphicWindow;
};

// Safe helper so callers can get window.innerHeight as a number without dealing with unions
export const getWindowInnerHeight = (): number => {
  const w = isomorphicWindow();
  if (typeof (w as Window).innerHeight === 'number') {
    return (w as Window).innerHeight;
  }
  // otherwise it's the fallback object
  return (w as { innerHeight: number }).innerHeight ?? 0;
};

export const hexToRGBA = (hex: string, alpha?: number): string => {
  if (!hex) return '';

  if (hex.length === 4) {
    // convert shorthand #RGB to #RRGGBB
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  const RR = parseInt(hex.slice(1, 3), 16);
  const GG = parseInt(hex.slice(3, 5), 16);
  const BB = parseInt(hex.slice(5, 7), 16);

  return `rgba(${RR}, ${GG}, ${BB}${alpha !== undefined ? `, ${alpha}` : ''})`;
};

export const valueExistInSelected = <T = unknown>(
  value: unknown,
  values: T[] = [],
  props?: SelectProps<T>,
): boolean =>
  !!values.find((val: unknown) =>
    props
      ? getByPath(val, (props as SelectProps<T>).valueField as string) === value ||
        getByPath(val, (props as SelectProps<T>).labelField as string) === value
      : false,
  );

export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay = 0) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId as ReturnType<typeof setTimeout>);
    }
    timerId = setTimeout(() => {
      fn(...(args as Parameters<T>));
      timerId = null;
    }, delay);
  };
};

export const isEqual = (a: Record<string, unknown>, b: Record<string, unknown>): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

export const getByPath = (object: unknown, path?: string): unknown => {
  if (!path) {
    return undefined;
  }

  return path.split('.').reduce((acc: unknown, key: string) => {
    if (acc == null) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, object);
};

export const getProp = (
  object: unknown,
  path: string | string[] | undefined,
  defaultValue?: unknown,
): unknown => {
  if (!path) {
    return object === undefined ? defaultValue : object;
  }

  const normalizedPath = Array.isArray(path)
    ? path
    : (path as string).split('.').filter(item => item.length);

  if (!normalizedPath.length) {
    return object === undefined ? defaultValue : object;
  }

  const first = normalizedPath.shift() as string;

  try {
    return getProp((object as Record<string, unknown>)[first], normalizedPath, defaultValue);
  } catch (e) {
    return defaultValue;
  }
};
