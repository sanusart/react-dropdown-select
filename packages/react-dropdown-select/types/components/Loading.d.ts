import { SelectProps } from '../select-types';
interface LoadingProps<T> {
    props: SelectProps<T>;
}
declare const Loading: <T extends Record<string, any>>({ props }: LoadingProps<T>) => JSX.Element | null;
export default Loading;
