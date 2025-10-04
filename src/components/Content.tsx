import React from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath } from '../util';

import type { SelectPropsStateMethodsType } from '../../types';
import type { ReactNode } from 'react';

function Content<T extends object | string = NonNullable<unknown>>({
  props,
  state,
  methods,
}: SelectPropsStateMethodsType<T>): React.ReactNode {
  if (props.contentRenderer) {
    return props.contentRenderer({ props, state, methods });
  }

  const children: ReactNode[] = [];

  if (props.multi) {
    if (state.values) {
      children.push(
        ...state.values.map((item: never) =>
          React.createElement(Option, {
            key: `${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`,
            item,
            state,
            props,
            methods,
          }),
        ),
      );
    }
  } else {
    if (state.values && state.values.length > 0) {
      children.push(
        React.createElement('span', null, getByPath(state.values[0], props.labelField) as string),
      );
    }
  }

  children.push(React.createElement(Input, { props, methods, state }));

  return React.createElement(
    ContentComponent,
    {
      className: `${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`,
      onClick: (event: KeyboardEvent) => {
        event.stopPropagation();
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close');
        } else {
          return methods.dropDown('open');
        }
      },
    },
    ...children,
  );
}

const ContentComponent = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

export default Content;
