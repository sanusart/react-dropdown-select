import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

import styled from '@emotion/styled';

import 'normalize.css';
import '../demo-styles.css';

import '../styles.css';

import { options } from '../options';

import Basic from '../examples/Basic';
import Multi from '../examples/Multi';
import OpenOnTop from '../examples/OpenOnTop';
import Styled from '../examples/Styled';
import ItemRenderer from '../examples/ItemRenderer';
import CreateEntries from '../examples/CreateEntries';
import CustomContentAndDropdown from '../examples/CustomContentAndDropdown';
import RenderInBody from '../examples/RenderInBody';
import Rtl from '../examples/Rtl';

const demoOptions = options.map((option) => ({
  ...option,
  label: option.name,
  value: option.email
}));

const Examples = () => (
  <div className="container px2 sm-px3">
    <Header page="examples" title="Examples" />

    <Wrapper>
      <Basic options={demoOptions} title="Basic" />
    </Wrapper>

    <Wrapper>
      <Multi options={demoOptions} title="Multi" />
    </Wrapper>

    <Wrapper>
      <Styled options={demoOptions} title="Styled" />
    </Wrapper>

    <Wrapper>
      <ItemRenderer options={demoOptions} title="Item custom renderer" />
    </Wrapper>

    <Wrapper>
      <CustomContentAndDropdown
        options={demoOptions}
        title="Custom Content And Dropdown renderers"
      />
    </Wrapper>

    <Wrapper>
      <CreateEntries
        options={demoOptions}
        title="Create new Entries"
      />
    </Wrapper>

    <Wrapper>
      <Rtl title="Right to left" />
    </Wrapper>

    <Wrapper>
      <RenderInBody
        options={demoOptions}
        title="Render dropdown in body"
      />
    </Wrapper>

    <Wrapper>
      <OpenOnTop options={demoOptions} title="Open on top" />
    </Wrapper>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <Footer />
  </div>
);

Examples.propTypes = {};

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;

  h2 {
    font-weight: 300;
  }
`;

export default Examples;
