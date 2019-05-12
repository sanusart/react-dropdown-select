import React, { Component } from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

class ExternalClear extends Component {
  state = { values: [] };

  onChange = (values) =>
    this.setState({
      values
    });

  render() {
    const { options, title } = this.props;
    return (
      <React.Fragment>
        <Title>
          <h2>{title}</h2>
          <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/ExternalClear.js">
            Source
          </a>
        </Title>
        <p>I can be cleared from outside | <button href={() => null} onClick={() => this.onChange([])}>&times; clear</button></p>
        <Select
          multi
          options={options}
          values={this.state.values}
          onChange={(value) => {
            this.onChange(value);
            console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value);
          }}
        />
      </React.Fragment>
    );
  }
}

ExternalClear.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default ExternalClear;
