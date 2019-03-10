import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

export class NoData extends React.Component {
  state = {
    options: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(responce => responce.json())
      .then(result => {
        this.setState({
          options: result.map(user => ({
            label: user.username,
            value: user.email
          })),
          loading: false
        });
      });
  }

  customNoDataRenderer = ({ props, state }) => (
    <StyledNoData>
      Ooops! nothing found for <strong>{state.search}</strong>, search{" "}
      <a
        href={`https://www.google.com/search?q=${state.search}`}
        target="_blank"
      >
        Google
      </a>{" "}
      instead
    </StyledNoData>
  );

  render() {
    return (
      <div>
        <Title>
          <h2>{this.props.title}</h2>
          <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/NoData.js">
            Source
          </a>
        </Title>

        <Select
          placeholder="Type to match nothing 😱"
          multi
          loading={this.state.loading}
          noDataRenderer={this.customNoDataRenderer}
          onChange={() => undefined}
          values={[]}
          options={this.state.options}
        />
      </div>
    );
  }
}

NoData.propTypes = {};

export default NoData;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledNoData = styled.div`
  padding: 10px;
  color: #555;
  background: #f2f2f2;
  border-radius: 5px;
  margin: 3px;
`;
