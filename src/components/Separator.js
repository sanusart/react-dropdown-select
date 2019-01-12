import React from 'react';
import styled from '@emotion/styled';

const Separator = ({ parentProps, parentState, parentMethods }) =>
  parentProps.separatorRenderer ? (
    parentProps.separatorRenderer(parentProps, parentState, parentMethods)
  ) : (
    <SeparatorComponent className="react-dropdown-select-separator" />
  );

Separator.propTypes = {};

const SeparatorComponent = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
