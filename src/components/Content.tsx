import React, { FC, MouseEvent } from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath } from '../util';

import type { SelectPropsModel, SelectStateModel, SelectMethodsModel } from '../../types';

interface ContentProps {
  props: SelectPropsModel;
  state: SelectStateModel;
  methods: SelectMethodsModel;
}

const Content: FC<ContentProps> = ({ props, state, methods }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (state.dropdown === true && props.closeOnClickInput && !state.search) {
      methods.dropDown('close');
    } else {
      methods.dropDown('open');
    }
  };

  return (
    <ContentComponent
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={handleClick}
    >
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <>
          {props.multi ? (
            state.values?.map((item: Record<string, any>) => (
              <Option
                key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
                item={item}
                state={state}
                props={props}
                methods={methods}
              />
            ))
          ) : (
            state.values && state.values.length > 0 && (
              <span>{getByPath(state.values[0], props.labelField)}</span>
            )
          )}
          <Input props={props} methods={methods} state={state} />
        </>
      )}
    </ContentComponent>
  );
};

const ContentComponent = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

export default Content;
