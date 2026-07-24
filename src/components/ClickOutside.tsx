import React from 'react';
import { ClickOutsideProps } from '../select-types';

class ClickOutside extends React.Component<ClickOutsideProps> {
  container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick = (event: MouseEvent) => {
    const container = this.container.current;
    const { target } = event;
    const { onClickOutside } = this.props;

    if ((container && container === target) || (container && !container.contains(target as Node))) {
      onClickOutside(event as any);
    }
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={className} ref={this.container}>
        {children}
      </div>
    );
  }
}

export default ClickOutside;
