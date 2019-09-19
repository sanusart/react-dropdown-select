import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';
import Select from '../../../src';

class ExternalClear extends Component {
  state = { values: [this.props.options[1]] };

  onChange = (values) =>
    this.setState({
      values
    });

  onSet = (values) => {
    const newValue = values.map((val) => ({ value: val.email, label: val.name }));

    return this.setState({
      values: [...this.state.values, ...newValue]
    });
  };

  render() {
    const { options, title } = this.props;
    return (
      <React.Fragment>
        <Heading
          title={title}
          source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/ExternalClear.js"
        />

        <p>I can be cleared from outside by setting values to <code>[]</code> <button href={() => null} onClick={() => this.onChange([])}>&times; clear</button></p>
        <p>Values can be added from outside <button href={() => null} onClick={() => this.onSet([options[Math.floor(Math.random() * (10 - 1) + 1)]])}>&raquo; set</button></p>
        <Select
          multi
          options={options}
          values={[...this.state.values]}
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
