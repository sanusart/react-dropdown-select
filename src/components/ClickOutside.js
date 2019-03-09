import React from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends React.Component {
  container = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick = (event) => {
    const container = this.container.current;
    const { target } = event;
    const { onClickOutside } = this.props;

    if ((container && container === target) || (container && !container.contains(target))) {
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

ClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ClickOutside;
