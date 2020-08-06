import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../index';
// import PropTypes from 'prop-types';

const renderer = new ShallowRenderer();

describe('<App />', () => {
  it.skip('should render and match the snapshot', () => {
    renderer.render(<App />);
    // const renderedOutput = renderer.getRenderOutput();
    // expect(renderedOutput).toMatchSnapshot();
  });
});
