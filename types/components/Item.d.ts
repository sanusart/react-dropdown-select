import { Component, RefObject } from 'react';
import { SelectProps, SelectState, SelectMethods } from '../select-types';
interface ItemProps<T> {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
    item: T;
    itemIndex: number;
}
declare class Item<T extends Record<string, any>> extends Component<ItemProps<T>> {
    item: RefObject<HTMLSpanElement>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
}
export default Item;
