import React from 'react';
import styled from '@emotion/styled';
import { getByPath } from '../util';
import { LIB_NAME } from '../constants';

import type { SelectProps, SelectState, SelectMethods } from '../../types';

interface OptionProps<T extends object | string = NonNullable<unknown>> {
  item: T;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

function Option<T extends object | string = NonNullable<unknown>>({
  item,
  props,
  state,
  methods,
}: OptionProps<T>): React.ReactNode {
  if (item && props.optionRenderer) {
    return props.optionRenderer({ item, props, state, methods });
  }

  const label = getByPath(item, props.labelField) as unknown as React.ReactNode;

  return React.createElement(
    OptionComponent,
    {
      role: 'listitem',
      disabled: props.disabled,
      direction: props.direction,
      className: `${LIB_NAME}-option`,
      color: props.color,
    },
    React.createElement('span', { className: `${LIB_NAME}-option-label` }, label),
    React.createElement(
      'span',
      {
        className: `${LIB_NAME}-option-remove`,
        onClick: (event: React.MouseEvent<HTMLElement>) =>
          methods.removeItem(event, item, !!props.closeOnSelect),
      },
      '\u00d7',
    ),
  );
}

interface OptionComponentProps {
  color?: string;
  direction?: 'ltr' | 'rtl';
}

const OptionComponent = styled.span<OptionComponentProps>`
  padding: 0 5px;
  border-radius: 2px;
  line-height: 21px;
  margin: 3px 0 3px 5px;
  background: ${({ color }) => color};
  color: #fff;
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'rtl' ? 'row-reverse' : 'row')};

  .${LIB_NAME}-option-remove {
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: inline-block;
    text-align: center;
    margin: 0 -5px 0 0px;
    border-radius: 0 3px 3px 0;

    :hover {
      color: tomato;
    }
  }

  :hover,
  :hover > span {
    opacity: 0.9;
  }
`;

export default Option;
