import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath } from '../util';
import SelectPropsModel from '../models/SelectPropsModel';
import SelectMethodsModel from '../models/SelectMethodsModel';
import SelectStateModel from '../models/SelectStateModel';

const Content = ({ props, state, methods }) => {
  return (
    <ContentComponent
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={(event) => {
        event.stopPropagation();
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close');
        } else {
          return methods.dropDown('open');
        }
      }}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.multi
            ? state.values &&
              state.values.map((item) => (
                <Option
                  key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
                  item={item}
                  state={state}
                  props={props}
                  methods={methods}
                />
              ))
            : state.values &&
              state.values.length > 0 && (
                <span>{getByPath(state.values[0], props.labelField)}</span>
              )}
          <Input props={props} methods={methods} state={state} />
        </React.Fragment>
      )}
    </ContentComponent>
  );
};

Content.propTypes = {
  props: PropTypes.shape(SelectPropsModel),
  state: PropTypes.shape(SelectStateModel),
  methods: PropTypes.shape(SelectMethodsModel)
};
const ContentComponent = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

export default Content;
