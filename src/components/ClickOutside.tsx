import React, { ReactNode } from 'react';

interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
  children: ReactNode;
  className?: string;
}

class ClickOutside extends React.Component<ClickOutsideProps> {
  container: React.RefObject<HTMLDivElement | null> = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick = (event: MouseEvent) => {
    const container = this.container.current;
    const target = event.target as Node | null;
    const { onClickOutside } = this.props;

    // If click target is outside container, call onClickOutside
    if (container && target && !container.contains(target)) {
      onClickOutside(event);
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
