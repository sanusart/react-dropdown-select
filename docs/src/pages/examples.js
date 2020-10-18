import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

import styled from '@emotion/styled';

import 'normalize.css';
import '../demo-styles.css';

import '../styles.css';

import { options } from '../options';

import Basic from '../examples/Basic';
import Form from '../examples/Form';
import Windowed from '../examples/Windowed';
import Multi from '../examples/Multi';
import OpenOnTop from '../examples/OpenOnTop';
import Styled from '../examples/Styled';
import ItemRenderer from '../examples/ItemRenderer';
import CreateEntries from '../examples/CreateEntries';
import CustomContentAndDropdown from '../examples/CustomContentAndDropdown';
import RenderInBody from '../examples/RenderInBody';
import Rtl from '../examples/Rtl';
import DropdownAutoPosition from '../examples/DropdownAutoPosition';
import NoData from '../examples/NoData';
import ExternalClear from '../examples/ExternalClear';
import AccessDataByPath from '../examples/AccessDataByPath';
import CustomDropdownHandle from '../examples/CustomDropdownHandle';
import WithAnimation from '../examples/WithAnimation';
import WithSearchFn from '../examples/WithSearchFn';

const demoOptions = options.map((option) => ({
  ...option,
  label: option.name,
  value: option.email
}));

const Examples = () => (
  <div className="container px2 sm-px3">
    <Header page="examples" title="Examples" />

    <Wrapper>
      <Basic options={demoOptions} title="Basic (using react-live)" />
    </Wrapper>

    <Wrapper>
      <Form options={demoOptions} title="Form with validation (using react-live)" />
    </Wrapper>

    <Wrapper>
      <Multi options={demoOptions} title="Multi" />
    </Wrapper>

    <Wrapper>
      <CustomDropdownHandle options={demoOptions} title="Custom dropdown handle" />
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
      <Rtl title="Right to left (rtl)" />
    </Wrapper>

    <Wrapper>
      <DropdownAutoPosition options={demoOptions} title="Dropdown auto-position"/>
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

    <Wrapper>
      <NoData title={`Custom "no data" renderer`} />
    </Wrapper>

    <Wrapper>
      <Windowed title={`Windowed (20000 items)`} />
    </Wrapper>

    <Wrapper>
      <ExternalClear options={demoOptions} title={`External clear and add`} />
    </Wrapper>

    <Wrapper>
      <AccessDataByPath title={`Access data by dotted path`} />
    </Wrapper>

    <Wrapper>
      <WithAnimation title={`With animations`} options={demoOptions} />
    </Wrapper>

    <Wrapper>
      <WithSearchFn title={`With a custom search function`} options={demoOptions} />
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
  padding: 20px;

  h2 {
    font-weight: 300;
  }
`;

export default Examples;
