import { ComponentRendererArgs } from '../select-types';
interface NoDataProps<T> extends ComponentRendererArgs<T> {
    className?: string;
}
declare const NoData: <T extends Record<string, any>>({ props, state, methods, className, }: NoDataProps<T>) => JSX.Element | null;
export default NoData;
