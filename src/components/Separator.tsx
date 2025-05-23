import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

interface SeparatorProps {
  props: {
    separatorRenderer?: (args: {
      props: SeparatorProps['props'];
      state: any;
      methods: any;
    }) => React.ReactNode;
  };
  state: any;
  methods: any;
}

const Separator: React.FC<SeparatorProps> = ({ props, state, methods }) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods })
  ) : (
    <SeparatorComponent className={`${LIB_NAME}-separator`} />
  );

const SeparatorComponent = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
