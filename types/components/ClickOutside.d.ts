import React from 'react';
import { ClickOutsideProps } from '../select-types';
declare class ClickOutside extends React.Component<ClickOutsideProps> {
    container: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleClick: (event: MouseEvent) => void;
    render(): React.JSX.Element;
}
export default ClickOutside;
