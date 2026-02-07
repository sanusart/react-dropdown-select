import React from 'react';

interface ClickOutsideProps {
  onClickOutside: (event: Event) => void;
  children: React.ReactNode;
  className?: string;
}

class ClickOutside extends React.Component<ClickOutsideProps> {
  private container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick = (event: Event) => {
    const container = this.container.current;
    const { target } = event;
    const { onClickOutside } = this.props;

    if ((container && container === target) || (container && !container.contains(target as Node))) {
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
