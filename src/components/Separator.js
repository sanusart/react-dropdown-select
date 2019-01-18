import React from 'react';
import styled from '@emotion/styled';

const Separator = ({ props, state, methods }) =>
  props.separatorRenderer ? (
    props.separatorRenderer(props, state, methods)
  ) : (
    <SeparatorComponent className="react-dropdown-select-separator" />
  );

const SeparatorComponent = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
