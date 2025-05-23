import React from 'react';
import styled from '@emotion/styled';
import { getByPath } from '../util';
import { LIB_NAME } from '../constants';

interface Props {
  item: Record<string, any>;
  props: {
    optionRenderer?: (args: {
      item: Record<string, any>;
      props: Props['props'];
      state: any;
      methods: any;
    }) => React.ReactNode;
    disabled?: boolean;
    direction?: 'ltr' | 'rtl';
    labelField: string;
    color?: string;
    closeOnSelect?: boolean;
  };
  state: any;
  methods: {
    removeItem: (
      event: React.MouseEvent,
      item: Record<string, any>,
      closeOnSelect?: boolean
    ) => void;
  };
}

const Option: React.FC<Props> = ({ item, props, state, methods }) =>
  item && props.optionRenderer ? (
    props.optionRenderer({ item, props, state, methods })
  ) : (
    <OptionComponent
      role="listitem"
      disabled={props.disabled}
      direction={props.direction}
      className={`${LIB_NAME}-option`}
      color={props.color}>
      <span className={`${LIB_NAME}-option-label`}>{getByPath(item, props.labelField)}</span>
      <span
        className={`${LIB_NAME}-option-remove`}
        onClick={(event) => methods.removeItem(event, item, props.closeOnSelect)}>
        &times;
      </span>
    </OptionComponent>
  );

const OptionComponent = styled.span<{ color?: string; direction?: 'ltr' | 'rtl' }>`
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
    margin: 0 -5px 0 0;
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
